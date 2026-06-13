# GitHub Publishing Guide

# ComfyFlow Insight

Complete Repository Setup, Upload, Release, and Installation Guide

---

# Overview

This guide explains how to:

* Create the GitHub repository
* Upload ComfyFlow Insight
* Configure repository settings
* Add screenshots and assets
* Create releases
* Enable issue tracking
* Publish documentation
* Allow users to install the extension

---

# Step 1: Prepare Repository

Verify your repository contains:

```text
ComfyUI-ComfyFlow-Insight/

README.md
LICENSE
CHANGELOG.md
CONTRIBUTING.md
CODE_OF_CONDUCT.md
SECURITY.md

backend/
docs/
nodes/
web/
assets/

requirements.txt
__init__.py

.github/
```

---

# Step 2: Create GitHub Repository

Login:

```text
https://github.com
```

Click:

```text
New Repository
```

Repository Name:

```text
ComfyUI-ComfyFlow-Insight
```

Visibility:

```text
Public
```

Do NOT initialize:

```text
README
.gitignore
LICENSE
```

because they already exist locally.

Click:

```text
Create Repository
```

---

# Step 3: Initialize Git

Open terminal.

Navigate to project:

```bash
cd ComfyUI-ComfyFlow-Insight
```

Initialize Git:

```bash
git init
```

---

# Step 4: Add Files

```bash
git add .
```

Verify:

```bash
git status
```

---

# Step 5: First Commit

```bash
git commit -m "Initial release of ComfyFlow Insight v1.0.0"
```

---

# Step 6: Connect GitHub Repository

Example:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ComfyUI-ComfyFlow-Insight.git
```

Verify:

```bash
git remote -v
```

---

# Step 7: Push Repository

```bash
git branch -M main
```

```bash
git push -u origin main
```

Upload may take several seconds.

---

# Step 8: Repository Description

GitHub Settings → General

Description:

```text
Advanced Workflow Intelligence Platform for ComfyUI
```

Website:

Leave empty unless documentation site exists.

---

# Step 9: Repository Topics

Add Topics:

```text
comfyui

comfyui-extension

workflow-analysis

workflow-engineering

ai-workflows

dependency-graph

workflow-health

workflow-visualization

python

open-source
```

These improve GitHub discoverability.

---

# Step 10: Add Social Preview

Navigate:

```text
Settings
↓
General
↓
Social Preview
```

Upload:

```text
assets/dashboard-preview.png
```

Recommended:

```text
1280 x 640
```

---

# Step 11: Enable Issues

Navigate:

```text
Settings
↓
Features
```

Enable:

```text
Issues
```

Your templates:

```text
.github/ISSUE_TEMPLATE.md
```

will automatically be used.

---

# Step 12: Enable Discussions (Optional)

Recommended:

```text
Enable Discussions
```

Useful for:

* User questions
* Feature requests
* Community support

---

# Step 13: Verify Templates

Open:

```text
Issues
↓
New Issue
```

Verify:

```text
ISSUE_TEMPLATE.md
```

loads correctly.

---

# Step 14: Verify Pull Requests

Open:

```text
Pull Requests
↓
New Pull Request
```

Verify:

```text
PULL_REQUEST_TEMPLATE.md
```

appears automatically.

---

# Step 15: Create First Release

Navigate:

```text
Releases
```

Click:

```text
Create Release
```

Tag:

```text
v1.0.0
```

Title:

```text
ComfyFlow Insight v1.0.0
```

---

# Release Notes

Example:

```text
Initial public release of ComfyFlow Insight.

Features:

- Workflow Overview
- Architecture Analyzer
- Workflow Statistics
- Branch Analyzer
- Dependency Graph
- Workflow Advisor
- Workflow Actions
- Node Explorer
- Health Analyzer

Includes complete documentation and GitHub repository setup.
```

Publish Release.

---

# Step 16: Add Screenshots

Create:

```text
assets/
```

Recommended:

```text
comfyflow_insight_logo.png

dashboard-preview.png

architecture-preview.png

dependency-preview.png

advisor-preview.png
```

Screenshots significantly increase GitHub engagement.

---

# Step 17: Verify README

Ensure:

```text
Logo displays

Badges display

Dashboard screenshot displays

Links work

Documentation links work
```

---

# Step 18: Repository Settings

Recommended:

### Allow Issues

```text
ON
```

### Allow Discussions

```text
ON
```

### Allow Wikis

```text
OFF
```

### Sponsorship

```text
Optional
```

### Projects

```text
OFF
```

for now.

---

# Installation Instructions For Users

Users install via:

```bash
cd ComfyUI/custom_nodes
```

```bash
git clone https://github.com/YOUR_USERNAME/ComfyUI-ComfyFlow-Insight.git
```

Restart ComfyUI.

Open:

```text
http://127.0.0.1:8188
```

ComfyFlow Insight becomes available.

---

# Updating The Repository

After making changes:

```bash
git add .
```

```bash
git commit -m "Update feature"
```

```bash
git push
```

---

# Creating New Releases

Example:

```text
v1.1.0

v1.2.0

v2.0.0
```

Each release should include:

* Updated CHANGELOG
* Release Notes
* Screenshots (if applicable)

---

# Recommended Version Strategy

```text
1.0.0 Initial Release

1.1.0 New Features

1.2.0 Improvements

1.3.0 Dashboard Enhancements

2.0.0 Major Platform Update
```

---

# Final Publishing Checklist

```text
✓ README.md

✓ LICENSE

✓ CHANGELOG.md

✓ CONTRIBUTING.md

✓ CODE_OF_CONDUCT.md

✓ SECURITY.md

✓ ISSUE_TEMPLATE.md

✓ PULL_REQUEST_TEMPLATE.md

✓ Documentation Complete

✓ Screenshots Added

✓ Repository Topics Added

✓ First Release Published
```

---

# Repository Status

Once all steps are complete, ComfyFlow Insight is ready for:

* GitHub Publishing
* Portfolio Presentation
* Recruiter Review
* Open Source Contributions
* Community Adoption

Congratulations on publishing ComfyFlow Insight.
