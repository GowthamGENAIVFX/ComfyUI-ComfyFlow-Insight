class WorkflowAdvisorEngine:

    def analyze(
        self,
        health_analysis,
        branch_analysis,
        dependency_graph,
        auto_fix_analysis,
        impact_analysis
    ):

        recommendations = []

        advisor_score = 100

        health_score = (
            health_analysis.get(
                "score",
                100
            )
        )

        advisor_score = min(
            advisor_score,
            health_score
        )

        branch_complexity = (
            branch_analysis.get(
                "branch_complexity",
                "Low"
            )
        )

        dependency_complexity = (
            dependency_graph.get(
                "dependency_complexity",
                "Low"
            )
        )

        fix_count = (
            auto_fix_analysis.get(
                "fix_count",
                0
            )
        )

        high_risk_nodes = (
            impact_analysis.get(
                "high_risk_nodes",
                0
            )
        )

        medium_risk_nodes = (
            impact_analysis.get(
                "medium_risk_nodes",
                0
            )
        )

        safe_removal_candidates = (
            impact_analysis.get(
                "safe_removal_candidates",
                0
            )
        )

        if (
            branch_complexity ==
            "Medium"
        ):
            advisor_score -= 10

        elif (
            branch_complexity ==
            "High"
        ):
            advisor_score -= 20

        if (
            dependency_complexity ==
            "Medium"
        ):
            advisor_score -= 10

        elif (
            dependency_complexity ==
            "High"
        ):
            advisor_score -= 20

        advisor_score -= (
            high_risk_nodes * 3
        )

        advisor_score -= (
            medium_risk_nodes * 1
        )

        advisor_score -= (
            fix_count * 2
        )

        advisor_score = max(
            0,
            advisor_score
        )

        if advisor_score >= 90:

            workflow_grade = "A"

            workflow_status = (
                "Production Ready"
            )

        elif advisor_score >= 75:

            workflow_grade = "B"

            workflow_status = (
                "Good"
            )

        elif advisor_score >= 60:

            workflow_grade = "C"

            workflow_status = (
                "Needs Improvement"
            )

        else:

            workflow_grade = "D"

            workflow_status = (
                "High Risk"
            )

        for issue in auto_fix_analysis.get(
            "fixes",
            []
        ):

            node_id = issue.get(
                "node_id"
            )

            impact = None

            for impact_node in impact_analysis.get(
                "nodes",
                []
            ):

                if (
                    impact_node.get(
                        "node_id"
                    )
                    ==
                    node_id
                ):
                    impact = (
                        impact_node
                    )
                    break

            recommendations.append({

                "title":
                    issue.get(
                        "fix_type",
                        "Unknown"
                    ),

                "severity":
                    issue.get(
                        "severity",
                        "Low"
                    ),

                "node_id":
                    node_id,

                "node_type":
                    issue.get(
                        "node_type",
                        "Unknown"
                    ),

                "description":
                    issue.get(
                        "description",
                        ""
                    ),

                "recommended_action":
                    issue.get(
                        "recommended_action",
                        ""
                    ),

                "impact":
                    impact

            })

        risk_assessment = {

            "high_risk_nodes":
                high_risk_nodes,

            "medium_risk_nodes":
                medium_risk_nodes,

            "safe_removal_candidates":
                safe_removal_candidates,

            "branch_complexity":
                branch_complexity,

            "dependency_complexity":
                dependency_complexity

        }

        insights = []

        insights.append(
            f"Workflow score is {advisor_score}/100."
        )

        insights.append(
            f"Workflow grade is {workflow_grade}."
        )

        insights.append(
            f"Workflow status is '{workflow_status}'."
        )

        insights.append(
            f"{fix_count} recommendation(s) generated."
        )

        insights.append(
            f"{safe_removal_candidates} safe removal candidate(s) found."
        )

        insights.append(
            f"{high_risk_nodes} high-risk node(s) detected."
        )

        return {

            "advisor_score":
                advisor_score,

            "workflow_grade":
                workflow_grade,

            "workflow_status":
                workflow_status,

            "recommendation_count":
                len(
                    recommendations
                ),

            "recommendations":
                recommendations,

            "risk_assessment":
                risk_assessment,

            "impact_analysis":
                impact_analysis.get(
                    "nodes",
                    []
                ),

            "safe_removal_candidates":
                safe_removal_candidates,

            "insights":
                insights

        }