# Dependency Graph

# ComfyFlow Insight

Technical Documentation

---

# Overview

The Dependency Graph Engine is one of the most important systems inside ComfyFlow Insight.

Its primary responsibility is to understand how nodes depend on one another and determine the impact of modifying, disconnecting, or removing nodes from a workflow.

While the Branch Analyzer focuses on workflow splitting, the Dependency Graph focuses on workflow relationships.

It answers questions such as:

* Which nodes depend on this node?
* Which nodes does this node depend on?
* Is this node safe to remove?
* What will break if this node is removed?
* Which nodes are isolated?
* Which nodes are critical?

---

# Why Dependency Analysis Matters

Large workflows often contain hundreds of node relationships.

Example:

```text
CheckpointLoader
      ↓
   KSampler
      ↓
   VAE Decode
      ↓
   Upscaler
      ↓
   SaveImage
```

Removing:

```text
VAE Decode
```

could break:

```text
Upscaler

SaveImage
```

Without dependency analysis, it becomes extremely difficult to predict workflow impact.

---

# Dependency Graph Objectives

The Dependency Graph Engine performs the following tasks:

```text
Build Node Relationships

Detect Dependencies

Detect Dependents

Detect Isolated Nodes

Identify Critical Nodes

Measure Dependency Complexity

Support Impact Analysis

Support Workflow Repair

Support Workflow Advisor
```

---

# Core Concepts

The Dependency Graph treats a workflow as a directed graph.

Example:

```text
Node A
   ↓
Node B
   ↓
Node C
```

Relationship:

```text
Node B depends on Node A

Node C depends on Node B
```

---

# Dependency

## Definition

A Dependency is a node required before another node can execute.

Example:

```text
LoadImage
     ↓
ImageScale
```

Dependency:

```text
ImageScale depends on LoadImage
```

---

## Why Dependencies Matter

Dependencies determine:

```text
Execution Order

Workflow Stability

Repair Risks

Failure Propagation
```

---

# Dependents

## Definition

A Dependent is a node that relies on another node.

Example:

```text
LoadImage
     ↓
ImageScale
```

Dependent:

```text
ImageScale
```

---

## Why Dependents Matter

Dependents reveal:

```text
Impact Scope

Workflow Reach

Critical Node Importance
```

Nodes with many dependents are often critical workflow components.

---

# Example Dependency Graph

Workflow:

```text
CheckpointLoader
        ↓
     KSampler
        ↓
     VAEDecode
        ↓
     SaveImage
```

Dependencies:

```text
KSampler
    depends on
    CheckpointLoader

VAEDecode
    depends on
    KSampler

SaveImage
    depends on
    VAEDecode
```

---

# Dependency Count

## Definition

Dependency Count measures how many upstream nodes are required.

---

## Example

```text
SaveImage
```

Depends on:

```text
CheckpointLoader

KSampler

VAEDecode
```

Dependency Count:

```text
3
```

---

## Interpretation

```text
0      Independent

1–3    Low

4–8    Moderate

8+     High
```

---

# Dependent Count

## Definition

Dependent Count measures how many downstream nodes rely on a node.

---

## Example

```text
KSampler
```

Feeds:

```text
VAEDecode

PreviewImage

SaveImage
```

Dependent Count:

```text
3
```

---

## Why It Matters

Higher dependent counts indicate:

```text
Critical Workflow Components

Higher Impact Risk

More Repair Sensitivity
```

---

# Isolated Nodes

## Definition

An Isolated Node has no workflow connections.

Example:

```text
WorkflowInspector
```

No incoming links.

No outgoing links.

---

# Example

```text
LoadImage → SaveImage


PreviewImage
```

Node:

```text
PreviewImage
```

is isolated.

---

# Why Isolated Nodes Matter

Isolated nodes often indicate:

```text
Unused Experiments

Development Artifacts

Workflow Mistakes

Forgotten Components
```

---

# Safe Removal Detection

One of the primary responsibilities of the Dependency Graph Engine is identifying nodes that may be safe to remove.

---

## Safe Candidate

Example:

```text
PreviewImage
```

Conditions:

```text
No Dependencies

No Dependents

No Workflow Impact
```

Result:

```text
Potentially Safe To Remove
```

---

## Important Warning

Safe removal suggestions are recommendations only.

Users must verify workflow intent before deleting nodes.

A node may be intentionally disconnected.

---

# Critical Nodes

## Definition

Critical Nodes are nodes with significant workflow influence.

Characteristics:

```text
Many Dependents

High Dependency Traffic

Core Workflow Position
```

---

# Example

```text
CheckpointLoader
```

Feeds:

```text
KSampler A

KSampler B

KSampler C

KSampler D
```

Impact:

```text
Removing this node breaks
multiple workflow sections.
```

---

# Dependency Chains

## Definition

A Dependency Chain is a sequence of connected dependencies.

Example:

```text
CheckpointLoader
      ↓
KSampler
      ↓
VAEDecode
      ↓
Upscaler
      ↓
SaveImage
```

Chain Length:

```text
5
```

---

# Why Chains Matter

Long chains increase:

```text
Complexity

Maintenance Cost

Debugging Difficulty

Repair Risk
```

---

# Dependency Complexity

## Definition

Dependency Complexity measures how difficult workflow relationships are to understand and maintain.

---

## Factors

The engine evaluates:

```text
Dependency Count

Dependent Count

Chain Length

Branching Impact

Workflow Depth
```

---

## Complexity Levels

### Low

Characteristics:

```text
Few Relationships

Short Chains

Easy Navigation
```

---

### Medium

Characteristics:

```text
Moderate Relationships

Several Branches

Manageable Complexity
```

---

### High

Characteristics:

```text
Large Dependency Chains

Multiple Critical Nodes

Complex Workflow Structure
```

---

# Dependency Risk Analysis

The Dependency Graph Engine identifies risk levels.

---

## Low Risk Node

Characteristics:

```text
Few Dependents

Minimal Connections

Limited Impact
```

---

## Medium Risk Node

Characteristics:

```text
Moderate Workflow Influence

Several Dependents
```

---

## High Risk Node

Characteristics:

```text
Core Workflow Component

Many Dependents

Multiple Branches
```

---

# Impact Analysis Support

The Dependency Graph Engine provides data to the Impact Analysis Engine.

Example:

```text
Node:
KSampler
```

Dependents:

```text
VAEDecode

PreviewImage

SaveImage
```

Impact:

```text
Removing KSampler
affects 3 downstream nodes.
```

---

# Workflow Repair Integration

Workflow Repair uses dependency information before generating recommendations.

Example:

```text
Isolated Node Found
```

Dependency Graph Result:

```text
Dependencies = 0

Dependents = 0
```

Repair Recommendation:

```text
Review For Removal
```

---

# Workflow Advisor Integration

Workflow Advisor uses dependency information when calculating workflow quality.

Example:

```text
High Dependency Complexity
```

Advisor Recommendation:

```text
Review Workflow Structure

Reduce Dependency Chains

Simplify Workflow Design
```

---

# Common Dependency Patterns

## Linear Pipeline

Example:

```text
Load
 ↓
Process
 ↓
Save
```

Characteristics:

```text
Simple

Easy To Maintain

Low Risk
```

---

## Branching Pipeline

Example:

```text
Input
  │
  ├── Branch A
  ├── Branch B
  └── Branch C
```

Characteristics:

```text
Moderate Complexity

Higher Maintenance
```

---

## Shared Dependency

Example:

```text
CheckpointLoader
      │
 ┌────┼────┐

 ▼    ▼    ▼

A     B     C
```

Characteristics:

```text
Critical Node

High Impact Risk
```

---

# Engineering Insights

Typical Dependency Insights:

```text
Workflow contains isolated nodes.

Dependency complexity is moderate.

Critical workflow components detected.

Long dependency chains identified.

Workflow structure is highly interconnected.
```

These insights help users understand workflow behavior beyond simple node counts.

---

# Example Analysis Report

```text
Dependency Graph Report

Total Dependencies       : 184

Critical Nodes           : 12

Isolated Nodes           : 3

Longest Dependency Chain : 18

Dependency Complexity    : High
```

Interpretation:

```text
Workflow contains
significant inter-node
relationships.

Impact analysis and
repair review are
recommended.
```

---

# Best Practices

## Review Isolated Nodes

Always verify whether isolated nodes are:

```text
Unused

Experimental

Intentionally Disconnected
```

before removal.

---

## Monitor Critical Nodes

Nodes with many dependents should be modified carefully.

Changes may affect large workflow sections.

---

## Reduce Excessive Chains

Long dependency chains increase:

```text
Maintenance Cost

Debugging Time

Repair Difficulty
```

Simplify where possible.

---

# Relationship With Other Engines

The Dependency Graph Engine supports:

```text
Branch Analyzer

Impact Analysis

Workflow Advisor

Workflow Repair

Workflow Actions
```

It acts as the central relationship engine inside ComfyFlow Insight.

---

# Summary

The Dependency Graph Engine provides deep visibility into workflow relationships.

It identifies:

```text
Dependencies

Dependents

Critical Nodes

Isolated Nodes

Dependency Chains

Dependency Complexity

Impact Risks
```

These insights help users safely modify workflows, understand workflow architecture, and make informed repair decisions.

Dependency analysis is the foundation for Impact Analysis, Workflow Advisor, and Workflow Repair recommendations.

---

# Next Document

Continue with:

```text
docs/workflow-advisor.md
```

This document explains workflow scoring, grading, production-readiness evaluation, risk assessment, recommendation generation, and engineering decision support.
