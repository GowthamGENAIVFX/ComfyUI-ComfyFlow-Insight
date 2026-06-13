# Workflow Repair

# ComfyFlow Insight

Technical Documentation

---

# Overview

The Workflow Repair Engine is responsible for transforming workflow analysis findings into actionable repair plans.

While Workflow Advisor identifies what should be improved, Workflow Repair focuses on how those improvements can be performed safely.

The Workflow Repair Engine acts as a workflow safety system by helping users understand:

* Which nodes may be removed safely
* Which repairs require manual review
* Which workflow components are critical
* What risks exist before making changes
* How workflow stability may be affected

---

# Why Workflow Repair Exists

Large workflows evolve over time.

As workflows grow, they often accumulate:

```text
Unused Nodes

Broken Connections

Experimental Components

Dead-End Chains

Orphaned Sections

Duplicate Logic

Abandoned Branches
```

Removing components manually can be dangerous.

Example:

```text
CheckpointLoader
      ↓
   KSampler
      ↓
   SaveImage
```

Removing:

```text
KSampler
```

would break:

```text
SaveImage
```

Workflow Repair helps identify these risks before changes are made.

---

# Core Objective

The Workflow Repair Engine provides safe, explainable repair recommendations.

It does not modify workflows automatically.

Instead, it provides a repair roadmap for users.

---

# Design Philosophy

ComfyFlow Insight follows a strict principle:

```text
Analyze First

Recommend Second

Modify Never
```

The system never automatically deletes, rewires, or alters workflow nodes.

All decisions remain under user control.

---

# Workflow Repair Pipeline

Workflow Repair receives information from:

```text
Health Analyzer
        ↓

Dependency Graph
        ↓

Impact Analysis
        ↓

Workflow Advisor
        ↓

Workflow Repair
```

Each engine contributes evidence used to generate repair recommendations.

---

# Repair Categories

The Workflow Repair Engine classifies repairs into two categories:

```text
Safe Repairs

Manual Repairs
```

---

# Safe Repairs

## Definition

Safe Repairs are low-risk recommendations that are unlikely to affect workflow functionality.

These repairs are typically associated with:

```text
Disconnected Nodes

Unused Components

Isolated Structures

Redundant Elements
```

---

# Example

Workflow:

```text
LoadImage
     ↓
SaveImage


PreviewImage
```

Node:

```text
PreviewImage
```

has:

```text
Dependencies = 0

Dependents = 0
```

Result:

```text
Potentially Safe To Remove
```

---

# Important Note

Safe does not mean automatic.

A node may be intentionally disconnected for:

```text
Future Development

Testing

Workflow Templates

Debugging
```

Users should always verify workflow intent.

---

# Manual Repairs

## Definition

Manual Repairs require human review.

These recommendations affect workflow behavior.

---

# Example

Workflow:

```text
KSampler
```

without:

```text
SaveImage
```

Repair Recommendation:

```text
Add SaveImage Node
```

This recommendation changes workflow behavior and therefore requires manual implementation.

---

# Why Manual Repairs Exist

The system cannot determine:

```text
User Intent

Creative Goals

Expected Outputs

Preferred Workflow Design
```

Human review is always required.

---

# Repair Recommendation Structure

Every repair recommendation contains:

```text
Repair Type

Severity

Node Information

Issue Description

Recommended Action

Risk Level
```

---

# Example Recommendation

```text
Repair Type:
Missing Output

Severity:
Medium

Node:
KSampler

Issue:
No output node detected.

Recommended Action:
Add SaveImage node.
```

---

# Repair Severity Levels

The Repair Engine assigns severity levels.

---

# Low Severity

Characteristics:

```text
Cosmetic Issues

Unused Nodes

Minor Warnings
```

Examples:

```text
Disconnected Preview Node

Unused Utility Node
```

---

# Medium Severity

Characteristics:

```text
Workflow Quality Issues

Missing Components

Optimization Opportunities
```

Examples:

```text
Missing SaveImage

Redundant Branches
```

---

# High Severity

Characteristics:

```text
Critical Workflow Problems

Execution Risks

Output Failures
```

Examples:

```text
Broken Dependency Chain

Missing Critical Node

Disconnected Core Workflow
```

---

# Risk Assessment

## Purpose

Risk Assessment estimates the likelihood that workflow modifications may cause problems.

---

# Risk Factors

The Repair Engine evaluates:

```text
Dependency Complexity

Impact Analysis

Branch Complexity

Critical Nodes

Workflow Health
```

---

# Risk Levels

```text
Low

Medium

High
```

---

# Low Risk

Characteristics:

```text
Minimal Dependencies

No Critical Impact

Isolated Components
```

Example:

```text
Unused Preview Node
```

---

# Medium Risk

Characteristics:

```text
Moderate Dependencies

Limited Workflow Impact
```

Example:

```text
Optional Processing Branch
```

---

# High Risk

Characteristics:

```text
Critical Dependencies

Large Downstream Impact

Core Workflow Components
```

Example:

```text
CheckpointLoader

KSampler

Primary Output Chain
```

---

# Repair Risk Score

## Definition

Repair Risk Score represents the estimated risk associated with workflow modification.

---

# Example

```text
Repair Risk Score = 12
```

Interpretation:

```text
0–20
Low Risk

21–50
Medium Risk

51+
High Risk
```

---

# Critical Node Protection

One of the most important responsibilities of Workflow Repair is protecting critical workflow components.

---

# Example

Workflow:

```text
CheckpointLoader
      ↓
KSampler A

KSampler B

KSampler C
```

Impact:

```text
Multiple Dependents
```

Recommendation:

```text
Manual Review Required
```

The engine prevents dangerous removal suggestions.

---

# Safe Removal Detection

Workflow Repair uses Dependency Graph and Impact Analysis results.

---

# Conditions

A node may be flagged as a safe removal candidate when:

```text
No Dependencies

No Dependents

No Workflow Impact
```

---

# Example

```text
PreviewImage
```

Result:

```text
Potential Safe Removal
```

---

# Important Warning

Safe removal is always a recommendation.

Users must confirm:

```text
Node Purpose

Workflow Intent

Future Usage
```

before deletion.

---

# Missing Output Detection

One common workflow issue is missing outputs.

---

# Example

Workflow:

```text
LoadImage
     ↓
KSampler
```

No:

```text
SaveImage
```

detected.

Repair Recommendation:

```text
Add SaveImage Node
```

---

# Broken Dependency Detection

The Repair Engine detects disconnected workflow chains.

---

# Example

```text
LoadImage

KSampler
```

No connection exists.

Result:

```text
Broken Dependency Chain
```

Repair Recommendation:

```text
Review Connection Structure
```

---

# Branch Repair Recommendations

The Repair Engine evaluates workflow branching.

---

# Example

```text
Branch Count = 12
```

Advisor Result:

```text
High Branch Complexity
```

Repair Recommendation:

```text
Review Branch Structure

Remove Redundant Paths

Simplify Processing Chains
```

---

# Repair Insights

The Repair Engine generates human-readable observations.

Examples:

```text
Workflow contains isolated nodes.

Safe removal candidates detected.

Critical dependencies identified.

Manual review recommended.

Output chain appears incomplete.
```

---

# Repair Workflow

Recommended process:

```text
Run Analysis
      ↓

Review Advisor
      ↓

Open Workflow Repair
      ↓

Review Safe Repairs
      ↓

Review Manual Repairs
      ↓

Implement Changes
      ↓

Run Analysis Again
```

This iterative process improves workflow quality over time.

---

# Integration With Workflow Advisor

Workflow Advisor answers:

```text
What should I improve?
```

Workflow Repair answers:

```text
How should I improve it?
```

Together they create a complete workflow optimization system.

---

# Integration With Export Center

Repair findings contribute to:

```text
Repair Reports

Portfolio Reports

Workflow Documentation

Engineering Assessments
```

These reports help users communicate workflow quality and maintenance status.

---

# Example Repair Report

```text
Workflow Repair Report

Safe Repairs:
2

Manual Repairs:
3

Risk Score:
18

Critical Nodes:
4

Repair Status:
Review Recommended
```

Interpretation:

```text
Workflow is generally healthy.

Minor repairs are recommended.

Low overall modification risk.
```

---

# Common Repair Scenarios

## Scenario 1

Issue:

```text
Disconnected Preview Node
```

Recommendation:

```text
Review For Removal
```

Risk:

```text
Low
```

---

## Scenario 2

Issue:

```text
Missing SaveImage
```

Recommendation:

```text
Add Output Node
```

Risk:

```text
Medium
```

---

## Scenario 3

Issue:

```text
Critical Dependency Chain
```

Recommendation:

```text
Manual Review Required
```

Risk:

```text
High
```

---

# Best Practices

## Never Blindly Remove Nodes

Always verify:

```text
Workflow Purpose

User Intent

Future Plans
```

---

## Review Critical Nodes Carefully

Nodes with many dependents should be modified cautiously.

---

## Re-Analyze After Repairs

After implementing changes:

```text
Run Full Analysis Again
```

to verify workflow health improvements.

---

## Use Repair Together With Advisor

Workflow Repair is most effective when used alongside Workflow Advisor recommendations.

---

# Relationship With Other Engines

Workflow Repair relies on:

```text
Health Analyzer

Dependency Graph

Impact Analysis

Workflow Advisor
```

These engines provide the evidence used to generate repair plans.

---

# Summary

The Workflow Repair Engine transforms workflow analysis findings into safe, explainable repair recommendations.

It provides:

```text
Safe Repairs

Manual Repairs

Repair Risk Analysis

Critical Node Protection

Missing Output Detection

Dependency Repair Guidance

Workflow Recovery Strategies
```

Most importantly, Workflow Repair never modifies workflows automatically.

The user remains in complete control of all workflow changes.

This design ensures workflow safety while still providing actionable engineering guidance.

---

# Next Document

Continue with:

```text
docs/export-center.md
```

This document explains report generation, portfolio exports, architecture reports, optimization reports, repair reports, and recruiter-focused workflow documentation.
