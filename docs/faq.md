# Frequently Asked Questions (FAQ)

# ComfyFlow Insight

User & Developer Guide

---

# Overview

This FAQ answers the most common questions about ComfyFlow Insight.

Whether you are a workflow creator, AI engineer, ComfyUI user, or developer, this document will help you better understand the platform and its capabilities.

---

# General Questions

## What is ComfyFlow Insight?

ComfyFlow Insight is a workflow engineering and analysis platform for ComfyUI.

It helps users understand, analyze, document, and evaluate workflows through automated engineering analysis.

The platform provides:

```text
Architecture Analysis

Workflow Statistics

Branch Analysis

Dependency Analysis

Workflow Health Analysis

Workflow Recommendations

Workflow Navigation

Node Discovery
```

---

## Why was ComfyFlow Insight created?

As ComfyUI workflows become larger, they become increasingly difficult to understand.

Example:

```text
100+ Nodes

200+ Links

Multiple Branches

Complex Dependencies
```

Manual inspection becomes inefficient.

ComfyFlow Insight was created to provide engineering visibility into workflow design.

---

## Does ComfyFlow Insight modify my workflow?

No.

ComfyFlow Insight is an analysis platform.

It:

```text
Analyzes

Reports

Recommends
```

It does not:

```text
Delete Nodes

Modify Nodes

Reconnect Nodes

Change Workflow Behavior
```

without user action.

---

## Is my workflow data uploaded anywhere?

No.

All analysis runs locally inside your ComfyUI environment.

ComfyFlow Insight does not send workflow data to external services.

---

## Does ComfyFlow Insight require an internet connection?

No.

After installation, analysis is performed locally.

---

# Dashboard Questions

## Which dashboard tab should I review first?

Recommended order:

```text
Overview

Architecture

Statistics

Branch Analyzer

Dependency Graph

Workflow Advisor

Workflow Actions

Node Explorer

Health Analyzer
```

---

## What does the Overview tab show?

Overview provides:

```text
Node Count

Link Count

Complexity Score

Health Score
```

It is intended to provide a quick workflow summary.

---

## What does the Architecture tab do?

Architecture Analysis helps users understand workflow structure.

It identifies:

```text
Entry Nodes

Exit Nodes

Workflow Depth

Longest Path

Branch Count
```

---

## What does Workflow Statistics do?

Workflow Statistics converts workflow information into engineering metrics.

Examples:

```text
Node Count

Link Count

Workflow Density

Complexity Score

Workflow Scale
```

---

## What does Branch Analyzer do?

Branch Analyzer identifies workflow branching behavior.

It measures:

```text
Branch Count

Branch Density

Parallel Paths

Branch Complexity
```

---

## What does Dependency Graph do?

Dependency Graph analyzes workflow relationships.

It identifies:

```text
Dependencies

Dependents

Critical Nodes

Dependency Chains

Isolated Nodes
```

---

## What does Workflow Advisor do?

Workflow Advisor combines results from all analysis engines and generates engineering recommendations.

It answers:

```text
Is the workflow healthy?

Can it be deployed?

What should be improved?
```

---

## What does Workflow Actions do?

Workflow Actions provides workflow navigation tools.

Examples:

```text
Locate Node

Select Node

Zoom To Node
```

---

## What does Node Explorer do?

Node Explorer provides a complete inventory of workflow nodes.

It helps users:

```text
Review Workflow Components

Discover Nodes

Audit Workflows

Navigate Large Workflows
```

---

## What does Health Analyzer do?

Health Analyzer evaluates workflow quality.

It identifies:

```text
Orphan Nodes

Dead-End Nodes

Missing Outputs

Workflow Health Score
```

---

# Metrics Questions

## What is Workflow Depth?

Workflow Depth measures the longest execution distance from workflow start to workflow finish.

Example:

```text
LoadImage
     ↓
ImageScale
     ↓
KSampler
     ↓
SaveImage
```

Depth:

```text
4
```

---

## What is Complexity Score?

Complexity Score estimates workflow complexity.

It considers:

```text
Node Count

Link Count

Branches

Dependencies

Workflow Structure
```

---

## What is Workflow Density?

Formula:

```text
Links ÷ Nodes
```

Example:

```text
180 Links

120 Nodes

Density = 1.5
```

---

## What is Health Score?

Health Score measures workflow quality.

Range:

```text
0–100
```

Interpretation:

```text
90–100 Excellent

75–89 Good

60–74 Needs Improvement

Below 60 High Risk
```

---

## What is Dependency Complexity?

Dependency Complexity estimates how difficult workflow relationships are to understand and maintain.

Possible values:

```text
Low

Medium

High
```

---

# Workflow Questions

## Can I analyze any ComfyUI workflow?

Yes.

ComfyFlow Insight is designed to analyze standard ComfyUI workflows.

---

## Can I analyze workflows with custom nodes?

Yes.

Custom nodes appear as workflow nodes and are included in analysis results.

---

## Can I analyze very large workflows?

Yes.

ComfyFlow Insight was specifically designed to help users understand large workflows.

Examples:

```text
100+ Nodes

200+ Nodes

300+ Nodes
```

---

## Can ComfyFlow Insight identify unused nodes?

Partially.

The system can identify:

```text
Isolated Nodes

Orphan Nodes

Disconnected Components
```

Users should review findings before making decisions.

---

## Can ComfyFlow Insight tell me which node is most important?

Yes.

Dependency Graph identifies nodes with:

```text
High Dependency Counts

High Dependent Counts

Critical Workflow Influence
```

---

# Developer Questions

## Can I extend ComfyFlow Insight?

Yes.

The platform is modular.

Examples:

```text
New Analysis Engines

New Dashboard Tabs

New Metrics

New Reports
```

can be added.

---

## Where are analysis engines located?

```text
nodes/
```

Examples:

```text
architecture_analyzer_engine.py

branch_analyzer_engine.py

dependency_graph_engine.py

workflow_advisor_engine.py

health_analyzer_engine.py
```

---

## Where is the dashboard UI located?

```text
web/
```

Examples:

```text
dashboard.js

node_explorer.js

dependency_graph.js

workflow_advisor.js
```

---

## Where are backend utilities located?

```text
backend/
```

Examples:

```text
graph_engine.py

workflow_parser.py

scoring_engine.py
```

---

# Troubleshooting

## Dashboard does not appear

Possible causes:

```text
ComfyUI restart required

Incomplete installation

Missing files
```

Solution:

```text
Restart ComfyUI

Verify folder structure

Refresh browser
```

---

## Analysis returns empty results

Possible causes:

```text
Workflow Not Loaded

Invalid Workflow

Corrupted Workflow JSON
```

---

## Browser displays old dashboard

Solution:

```text
Ctrl + Shift + R
```

or

```text
Ctrl + F5
```

---

# Best Practices

## Review Workflow Health First

Always review:

```text
Health Score
```

before deployment.

---

## Review Dependencies Before Refactoring

Dependency Graph helps prevent accidental workflow breakage.

---

## Use Node Explorer For Large Workflows

Node Explorer provides the fastest workflow overview.

---

## Review Workflow Advisor Before Sharing

Workflow Advisor provides a high-level engineering assessment.

---

# Summary

ComfyFlow Insight is a workflow engineering platform that helps users understand, analyze, and evaluate ComfyUI workflows.

The platform provides:

```text
Architecture Analysis

Workflow Statistics

Branch Analysis

Dependency Mapping

Workflow Health Analysis

Workflow Recommendations

Workflow Navigation

Node Discovery
```

Together these systems transform complex workflows into understandable engineering assets.

---

# Next Document

After completing all documentation files, proceed to:

```text
README.md
```

The README serves as the primary GitHub landing page and links to all documentation contained in the docs folder.
