# Installation Guide

# ComfyFlow Insight

Advanced Workflow Analysis, Repair & Documentation Platform for ComfyUI

---

# Introduction

Welcome to ComfyFlow Insight.

ComfyFlow Insight is a workflow engineering platform designed specifically for ComfyUI.

The extension helps users:

* Analyze workflow architecture
* Understand workflow complexity
* Detect workflow issues
* Identify dependencies
* Generate repair recommendations
* Produce workflow documentation
* Create portfolio-ready workflow reports

Unlike traditional workflow viewers, ComfyFlow Insight provides engineering-level visibility into workflow structure and health.

---

# System Requirements

Before installing ComfyFlow Insight, ensure your environment meets the following requirements.

## Required Software

### ComfyUI

ComfyFlow Insight requires an existing ComfyUI installation.

Supported:

* Latest ComfyUI Release
* Portable ComfyUI
* Standalone ComfyUI

---

### Python

Recommended:

```text
Python 3.10+
```

Supported:

```text
Python 3.10
Python 3.11
Python 3.12
```

---

### Operating Systems

Supported:

```text
Windows 10
Windows 11
Linux
Ubuntu
WSL2
```

---

# Installation

## Step 1

Navigate to your ComfyUI custom_nodes directory.

Example:

```text
ComfyUI/
└── custom_nodes/
```

---

## Step 2

Clone the repository.

```bash
git clone https://github.com/YOUR_USERNAME/ComfyUI-ComfyFlow-Insight.git
```

---

## Step 3

Verify folder structure.

The installation directory should look like:

```text
custom_nodes/

└── ComfyUI-ComfyFlow-Insight/
    ├── backend/
    ├── docs/
    ├── nodes/
    ├── web/
    ├── __init__.py
    └── requirements.txt
```

---

## Step 4

Restart ComfyUI.

If ComfyUI is currently running:

1. Close ComfyUI
2. Restart ComfyUI
3. Wait for startup completion

---

# Startup Verification

After launching ComfyUI:

Open the browser.

Navigate to:

```text
http://127.0.0.1:8188
```

---

Verify that ComfyFlow Insight loads successfully.

You should see:

```text
ComfyFlow Insight Dashboard
```

inside the ComfyUI interface.

---

# First Workflow Analysis

After installation:

1. Open ComfyUI
2. Load any workflow
3. Open ComfyFlow Insight
4. Click Analyze

The system should generate:

```text
Architecture Analysis
Workflow Statistics
Branch Analysis
Dependency Graph
Health Analysis
Workflow Advisor
Workflow Repair
Export Reports
```

---

# Project Structure

## Backend

Contains workflow processing logic.

```text
backend/
```

Responsibilities:

* Workflow parsing
* Graph processing
* Scoring
* Optimization

---

## Nodes

Contains ComfyUI backend services.

```text
nodes/
```

Responsibilities:

* API Server
* Workflow Analysis Engines
* Advisor Engine
* Repair Engine
* Export Engine

---

## Web

Contains frontend dashboard components.

```text
web/
```

Responsibilities:

* Dashboard UI
* Statistics View
* Advisor View
* Repair Center
* Export Center

---

## Docs

Contains project documentation.

```text
docs/
```

Responsibilities:

* Installation Guide
* Dashboard Guide
* Analyzer Documentation
* FAQ
* Technical Documentation

---

# Updating ComfyFlow Insight

Navigate to the repository directory.

```bash
cd ComfyUI-ComfyFlow-Insight
```

Pull latest changes.

```bash
git pull
```

Restart ComfyUI.

---

# Reinstallation

If problems occur:

Delete:

```text
custom_nodes/
└── ComfyUI-ComfyFlow-Insight
```

Clone again:

```bash
git clone https://github.com/YOUR_USERNAME/ComfyUI-ComfyFlow-Insight.git
```

Restart ComfyUI.

---

# Uninstallation

To completely remove ComfyFlow Insight:

Delete:

```text
custom_nodes/
└── ComfyUI-ComfyFlow-Insight
```

Restart ComfyUI.

The extension will no longer be loaded.

---

# Troubleshooting

## Dashboard Not Appearing

Possible Causes:

* ComfyUI not restarted
* Incomplete installation
* Missing files

Solution:

1. Verify folder structure
2. Restart ComfyUI
3. Check terminal logs

---

## Analysis Not Working

Possible Causes:

* Invalid workflow
* Corrupted workflow JSON
* Missing backend files

Solution:

1. Reload workflow
2. Refresh browser
3. Restart ComfyUI

---

## Empty Analysis Results

Possible Causes:

* Workflow contains no nodes
* Workflow failed to load

Solution:

1. Load workflow again
2. Verify nodes are visible in ComfyUI

---

## Browser Cache Issues

Sometimes the browser caches old dashboard files.

Solution:

Hard refresh:

```text
Ctrl + Shift + R
```

or

```text
Ctrl + F5
```

---

# Recommended Workflow

For best results:

1. Load workflow
2. Run Architecture Analysis
3. Review Workflow Statistics
4. Review Dependency Graph
5. Check Health Analysis
6. Open Workflow Advisor
7. Review Workflow Repair
8. Generate Export Reports

This process provides a complete engineering review of any workflow.

---

# Security Notes

ComfyFlow Insight:

* Does not upload workflow data
* Does not transmit workflow information externally
* Runs entirely within your ComfyUI environment
* Processes workflow data locally

---

# Next Steps

After installation, continue with:

```text
docs/dashboard-guide.md
```

The Dashboard Guide explains every tab, metric, score, analyzer, advisor, repair recommendation, and export report in detail.

---

# Support

If issues occur:

1. Check installation steps
2. Verify folder structure
3. Restart ComfyUI
4. Review console logs

Most installation issues are resolved by verifying the repository structure and restarting ComfyUI.

---

# Version

```text
ComfyFlow Insight v1.0.0
```

Installation Complete.
