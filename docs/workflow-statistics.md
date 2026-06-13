# Workflow Statistics

# ComfyFlow Insight

Technical Documentation

---

# Overview

The Workflow Statistics Engine is responsible for converting raw workflow data into measurable engineering metrics.

While the Architecture Analyzer focuses on workflow structure, the Workflow Statistics Engine focuses on numerical measurements.

Its purpose is to answer questions such as:

* How large is the workflow?
* How complex is the workflow?
* How dense are the node connections?
* How interconnected is the workflow?
* How scalable is the design?
* How does this workflow compare to others?

The Statistics Engine provides objective measurements that can be used for workflow auditing, optimization, documentation, and engineering reviews.

---

# Why Workflow Statistics Matter

Many workflow evaluations rely on visual inspection.

Visual inspection becomes unreliable when workflows exceed:

```text
50+ Nodes
100+ Links
Multiple Branches
```

Workflow Statistics provides quantifiable metrics that remove guesswork.

Instead of saying:

```text
"This workflow looks complicated."
```

You can say:

```text
Node Count       : 128
Link Count       : 194
Complexity Score : 86
Workflow Scale   : Advanced
```

---

# Statistics Engine Objectives

The engine performs the following tasks:

* Count Nodes
* Count Links
* Calculate Workflow Density
* Calculate Average Connections
* Calculate Complexity Score
* Determine Workflow Scale
* Generate Statistical Summary

---

# Node Count

## Definition

Node Count represents the total number of nodes present in the workflow.

Every node contributes to workflow complexity.

---

## Example

```text
LoadImage
ImageScale
KSampler
SaveImage
```

Node Count:

```text
4
```

---

## Interpretation

```text
1 – 25      Small Workflow

26 – 75     Medium Workflow

76 – 150    Large Workflow

150+        Enterprise Workflow
```

---

## Why It Matters

Higher node counts generally indicate:

* More functionality
* Greater flexibility
* Increased maintenance requirements
* Higher debugging effort

---

# Link Count

## Definition

Link Count represents the total number of node connections.

Links define workflow relationships.

---

## Example

```text
LoadImage
    ↓
ImageScale
    ↓
KSampler
    ↓
SaveImage
```

Link Count:

```text
3
```

---

## Interpretation

High link counts indicate:

* Increased workflow interaction
* Strong dependency chains
* Greater execution complexity

---

# Workflow Density

## Definition

Workflow Density measures how interconnected the workflow is.

Density compares the number of links to the number of nodes.

---

## Formula

```text
Workflow Density = Link Count ÷ Node Count
```

---

## Example

Workflow:

```text
Nodes = 100

Links = 150
```

Density:

```text
150 ÷ 100 = 1.5
```

---

## Interpretation

```text
0.0 – 1.0     Sparse

1.0 – 2.0     Moderate

2.0 – 3.0     Dense

3.0+          Highly Dense
```

---

## Benefits

Density reveals:

* Workflow interconnectedness
* Dependency concentration
* Potential maintenance complexity

---

# Average Connections

## Definition

Average Connections measures how many relationships exist per node.

---

## Formula

```text
Average Connections =
Total Links ÷ Total Nodes
```

---

## Example

```text
Nodes = 120

Links = 180
```

Average Connections:

```text
180 ÷ 120 = 1.5
```

---

## Why It Matters

Higher values indicate:

* Increased node interaction
* More dependencies
* Higher workflow coupling

---

# Complexity Score

## Definition

Complexity Score is the primary engineering metric used to estimate workflow complexity.

It combines multiple measurements into a single value.

---

## Inputs

The Complexity Score considers:

```text
Node Count

Link Count

Workflow Depth

Branch Count

Dependency Complexity
```

---

## Example

Workflow:

```text
Nodes      = 120

Links      = 180

Depth      = 28

Branches   = 7
```

Result:

```text
Complexity Score = 87
```

---

## Interpretation

```text
0 – 25      Simple

26 – 50     Moderate

51 – 75     Advanced

76 – 100    Enterprise
```

---

## Benefits

Complexity Score provides:

* Workflow benchmarking
* Engineering assessment
* Portfolio metrics
* Workflow comparison

---

# Workflow Scale

## Definition

Workflow Scale categorizes workflow size.

---

## Small

Characteristics:

```text
Minimal Processing

Few Dependencies

Simple Design
```

Typical Size:

```text
1 – 25 Nodes
```

---

## Medium

Characteristics:

```text
Multiple Processing Stages

Moderate Dependencies

Controlled Branching
```

Typical Size:

```text
25 – 75 Nodes
```

---

## Large

Characteristics:

```text
Advanced Processing

Complex Relationships

Significant Branching
```

Typical Size:

```text
75 – 150 Nodes
```

---

## Enterprise

Characteristics:

```text
Production Scale

Large Dependency Chains

Extensive Branching

Team Collaboration
```

Typical Size:

```text
150+ Nodes
```

---

# Statistical Summary

The Statistics Engine generates a summary report.

Example:

```text
Workflow Statistics

Node Count           : 120

Link Count           : 180

Density              : 1.50

Average Connections  : 1.50

Complexity Score     : 87

Workflow Scale       : Advanced
```

---

# Engineering Interpretation

## Low Node Count + High Density

Possible Meaning:

```text
Highly Optimized Workflow

Strong Node Reuse

Efficient Design
```

---

## High Node Count + Low Density

Possible Meaning:

```text
Large Workflow

Loose Coupling

Potential Redundancy
```

---

## High Complexity Score

Possible Meaning:

```text
Advanced Processing

Multiple Branches

Large Dependency Chains
```

Recommended Action:

```text
Review Architecture

Review Branch Analysis

Review Dependency Graph
```

---

# Common Workflow Categories

## Basic Image Generation

Typical Statistics:

```text
Nodes      : 15–30

Links      : 20–40

Complexity : Low
```

---

## Advanced Image Generation

Typical Statistics:

```text
Nodes      : 50–120

Links      : 80–200

Complexity : Medium
```

---

## Video Generation Workflow

Typical Statistics:

```text
Nodes      : 80–200

Links      : 120–300

Complexity : High
```

---

## Production Workflow

Typical Statistics:

```text
Nodes      : 150+

Links      : 250+

Complexity : Enterprise
```

---

# Relationship With Other Engines

Workflow Statistics works alongside:

```text
Architecture Analyzer

Branch Analyzer

Dependency Graph

Workflow Advisor
```

Statistics provide the numerical foundation used by higher-level analysis engines.

---

# Best Practices

## Monitor Complexity Growth

As workflows evolve:

* Track Node Count
* Track Link Count
* Monitor Density
* Monitor Complexity Score

---

## Compare Workflow Versions

Statistics allow direct comparison between workflow revisions.

Example:

```text
Version 1

Nodes = 80

Complexity = 62


Version 2

Nodes = 105

Complexity = 79
```

This immediately reveals complexity growth.

---

# Summary

The Workflow Statistics Engine transforms raw workflow structures into measurable engineering metrics.

It provides:

* Node Count
* Link Count
* Workflow Density
* Average Connections
* Complexity Score
* Workflow Scale

These metrics help users understand workflow size, complexity, maintainability, and scalability.

They also provide the numerical foundation used by Workflow Advisor and Workflow Repair systems.

---

# Next Document

Continue with:

```text
docs/branch-analyzer.md
```

This document explains branch detection, branching complexity, parallel execution paths, workflow splitting, and branch risk analysis.
