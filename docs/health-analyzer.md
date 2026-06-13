# Health Analyzer

# ComfyFlow Insight

Technical Documentation

---

# Overview

The Health Analyzer is responsible for evaluating workflow quality, stability, completeness, and maintainability.

While Architecture Analyzer focuses on workflow structure and Dependency Graph focuses on relationships, the Health Analyzer focuses on identifying workflow issues that may negatively impact execution, maintenance, or deployment.

The Health Analyzer acts as the quality assurance system of ComfyFlow Insight.

---

# Purpose

The Health Analyzer answers questions such as:

* Is the workflow healthy?
* Are there disconnected nodes?
* Are outputs properly configured?
* Are there workflow issues?
* Can the workflow be safely deployed?

---

# Health Score

## Definition

Health Score is the primary workflow quality metric.

Range:

```text
0 - 100
```

---

## Interpretation

```text
90 - 100
Excellent

75 - 89
Good

60 - 74
Needs Improvement

Below 60
High Risk
```

---

# Orphan Nodes

## Definition

Nodes that do not meaningfully contribute to workflow execution.

Example:

```text
PreviewImage
```

not connected to output chains.

---

# Dead-End Nodes

## Definition

Nodes that receive data but provide no useful downstream output.

Example:

```text
ImageScale
```

with no outgoing connections.

---

# Missing Output Detection

Example:

```text
KSampler
```

without:

```text
SaveImage
```

Result:

```text
Output Chain Incomplete
```

---

# Health Factors

Health Analyzer evaluates:

```text
Connectivity

Output Completeness

Node Participation

Workflow Integrity

Dependency Quality
```

---

# Example Report

```text
Health Score = 94

Orphan Nodes = 0

Dead-End Nodes = 1

Missing Outputs = 0

Status = Healthy
```

---

# Benefits

Health Analysis helps identify:

```text
Workflow Issues

Deployment Risks

Broken Structures

Missing Outputs

Quality Problems
```

---

# Best Practices

Always review:

```text
Health Score

Orphan Nodes

Dead-End Nodes

Output Validation
```

before deploying workflows.

---

# Summary

The Health Analyzer serves as the workflow quality assurance system of ComfyFlow Insight.

It helps users identify workflow issues before they become workflow failures.
