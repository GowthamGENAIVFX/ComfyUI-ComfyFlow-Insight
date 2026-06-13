# Dashboard Guide

# ComfyFlow Insight

Complete Dashboard Documentation

---

# Overview

The ComfyFlow Insight Dashboard is the central analysis workspace for workflow engineering.

It transforms raw ComfyUI workflows into structured engineering insights through multiple analysis engines.

The dashboard helps users:

- Understand workflow architecture
- Analyze workflow complexity
- Inspect workflow dependencies
- Evaluate workflow health
- Discover workflow risks
- Navigate large workflows
- Generate engineering recommendations

This guide explains every dashboard tab and how to interpret the information provided.

---

# Dashboard Layout

Current Dashboard Tabs:

Overview

Architecture

Statistics

Branch Analyzer

Dependency Graph

Workflow Advisor

Workflow Actions

Node Explorer

Health Analyzer

---

# Recommended Workflow Review Process

For best results:

Overview
    ↓
Architecture
    ↓
Statistics
    ↓
Branch Analyzer
    ↓
Dependency Graph
    ↓
Workflow Advisor
    ↓
Workflow Actions
    ↓
Node Explorer
    ↓
Health Analyzer

This sequence provides a complete engineering review of any workflow.

---

# Overview

## Purpose

The Overview tab provides a high-level summary of the workflow.

It is designed to quickly answer:

- How large is the workflow?
- How complex is the workflow?
- How healthy is the workflow?

---

## Metrics

### Nodes

Total number of workflow nodes.

Example:

Nodes: 120

---

### Links

Total number of workflow connections.

Example:

Links: 184

---

### Complexity

Overall workflow complexity score.

Example:

Complexity: 87

---

### Health

Overall workflow health score.

Example:

Health: 94

---

## Why It Matters

The Overview tab provides a quick workflow snapshot before diving into detailed analysis.

---

# Architecture

## Purpose

Architecture Analysis focuses on workflow structure.

It helps users understand how workflow execution is organized.

---

## Metrics

### Entry Nodes

Workflow starting points.

Examples:

LoadImage

CheckpointLoader

Text Prompt

---

### Exit Nodes

Workflow ending points.

Examples:

SaveImage

VideoCombine

Output Nodes

---

### Workflow Depth

Longest execution distance.

Example:

Depth = 18

Interpretation:

1-10     Simple

11-25    Medium

26-50    Advanced

50+      Enterprise

---

### Longest Path

Largest execution chain.

Example:

Longest Path = 24

---

### Branch Count

Number of workflow branches.

Example:

Branch Count = 6

---

## Benefits

Architecture Analysis helps identify:

- Workflow scale
- Design complexity
- Processing structure
- Execution patterns

---

# Statistics

## Purpose

Statistics converts workflow data into measurable engineering metrics.

---

## Metrics

### Node Count

Total workflow nodes.

---

### Link Count

Total workflow connections.

---

### Workflow Density

Formula:

Links ÷ Nodes

Example:

184 ÷ 120 = 1.53

---

### Complexity Score

Measures overall workflow complexity.

Example:

87

---

### Workflow Scale

Possible values:

Small

Medium

Large

Enterprise

---

## Benefits

Useful for:

- Workflow comparison
- Engineering reviews
- Portfolio reporting
- Complexity tracking

---

# Branch Analyzer

## Purpose

Analyzes workflow branching behavior.

---

## What Is A Branch?

A branch occurs when one node sends output to multiple downstream nodes.

Example:

ImageScale
├── SaveImage
├── PreviewImage
└── VideoCombine

---

## Metrics

### Branch Count

Total branching points.

---

### Branch Density

Branches relative to workflow size.

---

### Branch Complexity

Possible values:

Low

Medium

High

---

### Parallel Paths

Independent execution routes.

---

## Benefits

Helps identify:

- Workflow sprawl
- Maintenance challenges
- Complex execution paths

---

# Dependency Graph

## Purpose

Analyzes workflow relationships and execution dependencies.

This is one of the most important tabs in ComfyFlow Insight.

---

## Max Dependencies

Maximum upstream dependency count.

Example:

Max Dependencies = 4

Meaning:

One node requires four upstream nodes before it can execute.

---

## Max Dependents

Maximum downstream dependency count.

Example:

Max Dependents = 4

Meaning:

One node affects four downstream nodes.

---

## Isolated Nodes

Nodes without meaningful workflow connections.

Example:

Isolated Nodes = 0

---

## Dependency Complexity

Possible values:

Low

Medium

High

Example:

Dependency Complexity = Medium

Score = 40

---

## Most Dependent Node

Displays the most dependency-heavy node.

Example:

KSampler

Node ID: 3

Dependencies: 4

---

## Benefits

Dependency Analysis helps identify:

- Critical workflow nodes
- Dependency chains
- Workflow impact
- Modification risks

---

# Workflow Advisor

## Purpose

Workflow Advisor is the intelligence layer of ComfyFlow Insight.

It combines all analysis results into actionable recommendations.

---

## Metrics

### Workflow Score

Example:

93

---

### Workflow Grade

A = Production Ready

B = Good

C = Needs Improvement

D = High Risk

---

### Workflow Status

Examples:

Production Ready

Good

Needs Improvement

High Risk

---

### Recommendations

Examples:

Review isolated nodes

Reduce branch complexity

Review dependency chains

Verify outputs

---

## Benefits

Answers:

- Is the workflow healthy?
- Can it be deployed?
- What should be improved?

---

# Workflow Actions

## Purpose

Provides workflow navigation utilities.

Especially useful for large workflows.

---

## Available Actions

### Locate Node

Moves viewport to the selected node.

---

### Select Node

Automatically selects a node.

---

### Zoom To Node

Centers workflow view around a node.

---

## Benefits

- Faster navigation
- Easier debugging
- Improved workflow inspection

---

# Node Explorer

## Purpose

Provides a complete inventory of all workflow nodes.

---

## Information Displayed

### Node ID

Unique node identifier.

---

### Node Type

Node category.

Examples:

CheckpointLoader

KSampler

VAEDecode

SaveImage

ControlNet

---

### Workflow Inventory

Complete list of workflow nodes.

---

## Benefits

- Workflow auditing
- Faster navigation
- Node discovery
- Documentation support

---

## Recommended Usage

Open Node Explorer immediately after loading a workflow to understand workflow composition.

---

# Health Analyzer

## Purpose

Evaluates workflow quality and detects workflow issues.

---

## Metrics

### Health Score

Example:

94

Interpretation:

90-100   Excellent

75-89    Good

60-74    Needs Improvement

Below 60 High Risk

---

### Orphan Nodes

Nodes not contributing to workflow execution.

---

### Dead-End Nodes

Nodes receiving data but producing no useful output.

---

### Missing Output Detection

Example:

KSampler

without

SaveImage

---

## Benefits

Helps identify:

- Workflow issues
- Missing outputs
- Broken structures
- Deployment risks

---

# Best Practices

Before deployment:

- Review Health Score
- Review Workflow Grade
- Review Dependency Complexity
- Review Branch Complexity

Before refactoring:

- Review Dependency Graph
- Review Node Explorer
- Review Workflow Advisor

Before sharing workflows:

- Review Architecture
- Review Statistics
- Review Health Analysis

---

# Summary

The ComfyFlow Insight Dashboard transforms raw workflows into engineering insights.

It provides:

- Workflow Overview
- Architecture Analysis
- Workflow Statistics
- Branch Analysis
- Dependency Mapping
- Workflow Recommendations
- Navigation Utilities
- Node Discovery
- Health Diagnostics

Together these systems help users understand, maintain, optimize, and document ComfyUI workflows with confidence.