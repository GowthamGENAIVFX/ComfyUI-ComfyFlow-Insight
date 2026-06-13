class WorkflowRepairEngine:

    def analyze(
        self,
        nodes,
        links,
        health_analysis,
        dependency_graph,
        impact_analysis
    ):

        repair_plan = []

        safe_repairs = []

        manual_repairs = []

        risk_score = 0

        issues = (
            health_analysis.get(
                "issues",
                []
            )
        )

        impact_nodes = {

            node.get(
                "node_id"
            ):
            node

            for node
            in
            impact_analysis.get(
                "nodes",
                []
            )
        }

        for issue in issues:

            node_id = issue.get(
                "node_id"
            )

            issue_type = issue.get(
                "issue_type",
                "Unknown"
            )

            impact = impact_nodes.get(
                node_id,
                {}
            )

            safe_to_remove = (
                impact.get(
                    "safe_to_remove",
                    False
                )
            )

            risk = impact.get(
                "risk",
                issue.get(
                    "risk",
                    "Medium"
                )
            )

            recommendation = issue.get(
                "recommendation",
                ""
            )

            action = None

            preview = None

            if (
                issue_type ==
                "Orphan Node"
            ):

                action = (
                    "Remove Node"
                )

                preview = (
                    "Delete isolated node."
                )

            elif (
                issue_type ==
                "Dead End Node"
            ):

                action = (
                    "Review Connection"
                )

                preview = (
                    "Inspect downstream workflow."
                )

            elif (
                issue_type ==
                "Missing Save Node"
            ):

                action = (
                    "Add SaveImage"
                )

                preview = (
                    "Attach SaveImage node to final output."
                )

            else:

                action = (
                    "Manual Review"
                )

                preview = (
                    recommendation
                )

            repair = {

                "node_id":
                    node_id,

                "node_type":
                    issue.get(
                        "node_type",
                        "Unknown"
                    ),

                "issue_type":
                    issue_type,

                "risk":
                    risk,

                "safe_to_apply":
                    safe_to_remove,

                "recommended_action":
                    action,

                "preview":
                    preview

            }

            repair_plan.append(
                repair
            )

            if (
                safe_to_remove
            ):
                safe_repairs.append(
                    repair
                )
            else:
                manual_repairs.append(
                    repair
                )

            if risk == "High":
                risk_score += 10

            elif risk == "Medium":
                risk_score += 5

            else:
                risk_score += 1

        isolated_nodes = (
            dependency_graph.get(
                "isolated_nodes",
                []
            )
        )

        for node in isolated_nodes:

            repair = {

                "node_id":
                    node.get(
                        "node_id"
                    ),

                "node_type":
                    node.get(
                        "node_type",
                        "Unknown"
                    ),

                "issue_type":
                    "Isolated Node",

                "risk":
                    "Low",

                "safe_to_apply":
                    True,

                "recommended_action":
                    "Remove Node",

                "preview":
                    "Node has no dependencies and no dependents."

            }

            repair_plan.append(
                repair
            )

            safe_repairs.append(
                repair
            )

        health_status = (
            "Healthy"
        )

        if risk_score > 50:

            health_status = (
                "Critical"
            )

        elif risk_score > 20:

            health_status = (
                "Warning"
            )

        insights = []

        insights.append(
            f"{len(repair_plan)} repair(s) identified."
        )

        insights.append(
            f"{len(safe_repairs)} safe repair(s) available."
        )

        insights.append(
            f"{len(manual_repairs)} manual review item(s) detected."
        )

        insights.append(
            f"Workflow repair risk score: {risk_score}."
        )

        return {

            "health_status":
                health_status,

            "risk_score":
                risk_score,

            "repair_count":
                len(
                    repair_plan
                ),

            "safe_repairs":
                safe_repairs,

            "manual_repairs":
                manual_repairs,

            "repair_plan":
                repair_plan,

            "insights":
                insights

        }