class ExportCenterEngine:

    def analyze(
        self,
        nodes,
        links,
        architecture_analysis,
        workflow_statistics,
        health_analysis,
        dependency_graph,
        workflow_advisor,
        workflow_repair
    ):

        architecture_report = (
            self._build_architecture_report(
                architecture_analysis
            )
        )

        optimization_report = (
            self._build_optimization_report(
                dependency_graph,
                workflow_advisor
            )
        )

        repair_report = (
            self._build_repair_report(
                workflow_repair
            )
        )

        portfolio_report = (
            self._build_portfolio_report(
                nodes,
                links,
                workflow_statistics,
                health_analysis,
                workflow_advisor
            )
        )

        export_summary = {

            "total_nodes":
                len(nodes),

            "total_links":
                len(links),

            "workflow_grade":
                workflow_advisor.get(
                    "workflow_grade",
                    "N/A"
                ),

            "health_score":
                health_analysis.get(
                    "score",
                    0
                ),

            "risk_score":
                workflow_repair.get(
                    "risk_score",
                    0
                )

        }

        insights = []

        insights.append(
            "Architecture report generated."
        )

        insights.append(
            "Optimization report generated."
        )

        insights.append(
            "Repair report generated."
        )

        insights.append(
            "Portfolio report generated."
        )

        return {

            "export_summary":
                export_summary,

            "architecture_report":
                architecture_report,

            "optimization_report":
                optimization_report,

            "repair_report":
                repair_report,

            "portfolio_report":
                portfolio_report,

            "insights":
                insights

        }

    def _build_architecture_report(
        self,
        architecture_analysis
    ):

        lines = []

        lines.append(
            "# Architecture Report"
        )

        lines.append("")

        lines.append(
            f"Workflow Depth: "
            f"{architecture_analysis.get('workflow_depth', 0)}"
        )

        lines.append(
            f"Longest Path: "
            f"{architecture_analysis.get('longest_path', 0)}"
        )

        lines.append(
            f"Branch Count: "
            f"{architecture_analysis.get('branch_count', 0)}"
        )

        lines.append("")

        lines.append(
            "## Entry Nodes"
        )

        for node in architecture_analysis.get(
            "entry_nodes",
            []
        ):

            lines.append(
                f"- {node.get('type', 'Unknown')}"
            )

        lines.append("")

        lines.append(
            "## Exit Nodes"
        )

        for node in architecture_analysis.get(
            "exit_nodes",
            []
        ):

            lines.append(
                f"- {node.get('type', 'Unknown')}"
            )

        return "\n".join(
            lines
        )

    def _build_optimization_report(
        self,
        dependency_graph,
        workflow_advisor
    ):

        lines = []

        lines.append(
            "# Optimization Report"
        )

        lines.append("")

        isolated_nodes = (
            dependency_graph.get(
                "isolated_nodes",
                []
            )
        )

        lines.append(
            f"Isolated Nodes: "
            f"{len(isolated_nodes)}"
        )

        lines.append("")

        lines.append(
            "## Recommendations"
        )

        for recommendation in workflow_advisor.get(
            "recommendations",
            []
        ):

            lines.append(
                f"- {recommendation.get('title', 'Unknown')}"
            )

        return "\n".join(
            lines
        )

    def _build_repair_report(
        self,
        workflow_repair
    ):

        lines = []

        lines.append(
            "# Repair Report"
        )

        lines.append("")

        lines.append(
            f"Risk Score: "
            f"{workflow_repair.get('risk_score', 0)}"
        )

        lines.append("")

        lines.append(
            "## Safe Repairs"
        )

        for repair in workflow_repair.get(
            "safe_repairs",
            []
        ):

            lines.append(
                f"- {repair.get('recommended_action', 'Unknown')}"
            )

        lines.append("")

        lines.append(
            "## Manual Repairs"
        )

        for repair in workflow_repair.get(
            "manual_repairs",
            []
        ):

            lines.append(
                f"- {repair.get('recommended_action', 'Unknown')}"
            )

        return "\n".join(
            lines
        )

    def _build_portfolio_report(
        self,
        nodes,
        links,
        workflow_statistics,
        health_analysis,
        workflow_advisor
    ):

        lines = []

        lines.append(
            "# Portfolio Report"
        )

        lines.append("")

        lines.append(
            "## Project Summary"
        )

        lines.append("")

        lines.append(
            f"Node Count: {len(nodes)}"
        )

        lines.append(
            f"Link Count: {len(links)}"
        )

        lines.append(
            f"Workflow Grade: "
            f"{workflow_advisor.get('workflow_grade', 'N/A')}"
        )

        lines.append(
            f"Health Score: "
            f"{health_analysis.get('score', 0)}"
        )

        lines.append(
            f"Complexity Score: "
            f"{workflow_statistics.get('complexity_score', 0)}"
        )

        lines.append("")

        lines.append(
            "## Recruiter Summary"
        )

        lines.append("")

        lines.append(
            "This workflow was analyzed using "
            "ComfyFlow Insight."
        )

        lines.append(
            "Architecture, dependency analysis, "
            "repair planning, optimization analysis "
            "and workflow health checks completed."
        )

        return "\n".join(
            lines
        )