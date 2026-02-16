import { IInputs, IOutputs } from "./generated/ManifestTypes";

type DataSet = ComponentFramework.PropertyTypes.DataSet;

// Sort direction enum
const enum SortDirection {
    None,
    Ascending,
    Descending,
}

export class DataSetTable
    implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
    private _container: HTMLDivElement;
    private _tableContainer: HTMLDivElement;

    // Sort state
    private _sortColumn: string | null = null;
    private _sortDirection: SortDirection = SortDirection.None;

    constructor() {
        // Empty
    }

    // ------------------------------------------------------------------ init
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        _state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._container = container;

        this._tableContainer = document.createElement("div");
        this._tableContainer.classList.add("bb-table-container");
        this._container.appendChild(this._tableContainer);

        // Show loading on first paint
        this._tableContainer.innerHTML = `<div class="bb-table-loading">Loading data…</div>`;
    }

    // --------------------------------------------------------------- updateView
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const dataSet: DataSet = context.parameters.contactsDataSet;

        // Wait until data is loaded
        if (dataSet.loading) {
            this._tableContainer.innerHTML = `<div class="bb-table-loading">Loading data…</div>`;
            return;
        }

        // Get columns (visible ones only)
        const columns = dataSet.columns.filter((c) => !c.isHidden && c.order >= 0);
        columns.sort((a, b) => a.order - b.order);

        // Get sorted record IDs
        const sortedIds = dataSet.sortedRecordIds;

        if (columns.length === 0 || sortedIds.length === 0) {
            this._tableContainer.innerHTML = `<div class="bb-table-empty">No contact records to display.</div>`;
            this.renderPaging(dataSet);
            return;
        }

        // Build table
        const table = document.createElement("table");
        table.classList.add("bb-table");

        // --- THEAD ---
        const thead = document.createElement("thead");
        const headRow = document.createElement("tr");

        for (const col of columns) {
            const th = document.createElement("th");
            th.textContent = col.displayName;

            // Sort arrow indicator
            if (this._sortColumn === col.name) {
                const arrow = document.createElement("span");
                arrow.classList.add("bb-sort-arrow");
                arrow.textContent =
                    this._sortDirection === SortDirection.Ascending ? "▲" : "▼";
                th.appendChild(arrow);
            }

            th.title = `Sort by ${col.displayName}`;
            th.addEventListener("click", () => this.onColumnHeaderClick(col.name, dataSet));

            headRow.appendChild(th);
        }
        thead.appendChild(headRow);
        table.appendChild(thead);

        // --- TBODY ---
        const tbody = document.createElement("tbody");

        for (const id of sortedIds) {
            const record = dataSet.records[id];
            const row = document.createElement("tr");

            for (const col of columns) {
                const td = document.createElement("td");
                td.textContent = record.getFormattedValue(col.name) ?? "";
                td.title = td.textContent;
                row.appendChild(td);
            }

            tbody.appendChild(row);
        }

        table.appendChild(tbody);

        // Render
        this._tableContainer.innerHTML = "";
        this._tableContainer.appendChild(table);

        // Paging
        this.renderPaging(dataSet);
    }

    // -------------------------------------------------------- column sort click
    private onColumnHeaderClick(columnName: string, dataSet: DataSet): void {
        // Cycle: None -> Asc -> Desc -> None
        if (this._sortColumn !== columnName) {
            this._sortColumn = columnName;
            this._sortDirection = SortDirection.Ascending;
        } else {
            switch (this._sortDirection) {
                case SortDirection.None:
                    this._sortDirection = SortDirection.Ascending;
                    break;
                case SortDirection.Ascending:
                    this._sortDirection = SortDirection.Descending;
                    break;
                case SortDirection.Descending:
                    this._sortColumn = null;
                    this._sortDirection = SortDirection.None;
                    break;
            }
        }

        // Apply sorting through the dataset API
        if (this._sortColumn && this._sortDirection !== SortDirection.None) {
            dataSet.sorting = [
                {
                    name: this._sortColumn,
                    sortDirection:
                        this._sortDirection === SortDirection.Ascending ? 0 : 1,
                },
            ];
        } else {
            dataSet.sorting = [];
        }

        dataSet.refresh();
    }

    // ---------------------------------------------------- paging bar
    private renderPaging(dataSet: DataSet): void {
        const paging = dataSet.paging;
        if (!paging) return;

        const bar = document.createElement("div");
        bar.classList.add("bb-table-paging");

        const info = document.createElement("span");
        info.textContent = `Total records: ${paging.totalResultCount}`;

        const buttons = document.createElement("div");
        buttons.classList.add("bb-table-paging-buttons");

        // Previous
        const prevBtn = document.createElement("button");
        prevBtn.classList.add("bb-page-btn");
        prevBtn.textContent = "← Previous";
        prevBtn.disabled = !paging.hasPreviousPage;
        prevBtn.addEventListener("click", () => paging.loadPreviousPage());

        // Next
        const nextBtn = document.createElement("button");
        nextBtn.classList.add("bb-page-btn");
        nextBtn.textContent = "Next →";
        nextBtn.disabled = !paging.hasNextPage;
        nextBtn.addEventListener("click", () => paging.loadNextPage());

        buttons.appendChild(prevBtn);
        buttons.appendChild(nextBtn);

        bar.appendChild(info);
        bar.appendChild(buttons);
        this._tableContainer.appendChild(bar);
    }

    // --------------------------------------------------------------- getOutputs
    public getOutputs(): IOutputs {
        return {};
    }

    // --------------------------------------------------------------- destroy
    public destroy(): void {
        // Cleanup handled by DOM removal
    }
}
