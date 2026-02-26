# BB_PCF - PowerApps Component Framework Commands

> Complete guide for building and deploying the BB_PCF project containing **Slider** and **DataSetTable** controls.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [.NET SDK](https://dotnet.microsoft.com/download)
- [Power Platform CLI](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction)

### Authenticate to Power Platform

```powershell
pac auth create --url https://org6997a654.crm5.dynamics.com/
```

```powershell
# Verify authentication
pac auth list
```

---

## Step 1: Initialize PCF Controls

> Run these in the `BB_PCF` project root.

### Slider Control (Field Template)

```powershell
pac pcf init --namespace BB.PCF.Slider --name Slider --template field --run-npm-install
```

### DataSetTable Control (Dataset Template)

```powershell
pac pcf init --namespace BB.PCF.DataTable --name DataSetTable --template Dataset
```

---

## Step 2: Install Dependencies

```powershell
npm install
```

---

## Step 3: Build the PCF Project

```powershell
npm run build
```

---

## Step 4: Create the Solution Project

> Run this in the **parent folder** (`PCF\`), one level above `BB_PCF`.

```powershell
mkdir BB_PCF_Solution
```

---

## Step 5: Initialize the Solution

> Run this inside the newly created `BB_PCF_Solution` folder.

```powershell
pac solution init --publisher-name BBPublisher --publisher-prefix bb
```

---

## Step 6: Add Reference to PCF Project

> Run this inside `BB_PCF_Solution`.

```powershell
pac solution add-reference --path ..\BB_PCF
```

---

## Step 7: Build the Solution

> Run this inside `BB_PCF_Solution`.

```powershell
dotnet build
```

This generates `BB_PCF_Solution.zip` at `bin\Debug\BB_PCF_Solution.zip`.

---

## Step 8: Import Solution to Dataverse

> Run this inside `BB_PCF_Solution`.

```powershell
pac solution import --path bin\Debug\BB_PCF_Solution.zip
```

---

## Folder Structure

```
C:\Projects\Anudeep\PCF\
├── BB_PCF\                          ← PCF project root
│   ├── DataSetTable\
│   │   ├── ControlManifest.Input.xml
│   │   ├── css\
│   │   │   └── DataSetTable.css
│   │   └── index.ts
│   ├── Slider\
│   │   ├── ControlManifest.Input.xml
│   │   ├── css\
│   │   │   └── Slider.css
│   │   └── index.ts
│   ├── BB_PCF.pcfproj
│   ├── package.json
│   ├── tsconfig.json
│   └── eslint.config.mjs
│
└── BB_PCF_Solution\                 ← Solution project
    ├── BB_PCF_Solution.cdsproj
    ├── src\
    │   └── Other\
    │       └── Solution.xml
    └── bin\
        └── Debug\
            └── BB_PCF_Solution.zip
```

---

## Additional Useful Commands

### Development

```powershell
# Start the test harness locally
npm start

# Start with watch mode (auto-rebuild on changes)
npm run start:watch

# Clean build artifacts
npm run clean

# Rebuild from scratch
npm run rebuild

# Run linting
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Refresh type definitions
npm run refreshTypes
```

### Solution Management

```powershell
# Export solution from environment
pac solution export --path BB_PCF_Solution.zip --name BB_PCF_Solution

# Export as managed solution
pac solution export --path BB_PCF_Solution_managed.zip --name BB_PCF_Solution --managed true

# List solutions in environment
pac solution list
```

### Environment Management

```powershell
# List authenticated profiles
pac auth list

# Switch active auth profile
pac auth select --index 1

# List environments
pac env list
```
