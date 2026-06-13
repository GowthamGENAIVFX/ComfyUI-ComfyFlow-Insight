class AutoFixEngine:

    IGNORED_NODES = {

        "WorkflowInspector",

        "WorkflowDocumentationGenerator",

        "WorkflowOptimizer",

        "WorkflowComparator"

    }

    SAVE_NODE_TYPES = {

        "SaveImage",

        "SaveAnimatedWEBP",

        "SaveVideo",

        "VHS_VideoCombine",

        "SaveEXRFrames"

    }

    def analyze(
        self,
        nodes,
        links,
        health_analysis=None,
        branch_analysis=None,
        dependency_graph=None
    ):

        fixes = []

        priority_score = 0

        node_map = {}

        for node in nodes:

            node_map[
                node.get("id")
            ] = node

        if health_analysis:

            for issue in health_analysis.get(
                "issues",
                []
            ):

                issue_type = issue.get(
                    "issue_type",
                    ""
                )

                node_id = issue.get(
                    "node_id"
                )

                node_type = issue.get(
                    "node_type",
                    "Unknown"
                )

                if (
                    issue_type ==
                    "Missing Save Node"
                ):

                    fixes.append({

                        "fix_type":
                            "Add Save Node",

                        "severity":
                            "High",

                        "node_id":
                            node_id,

                        "node_type":
                            node_type,

                        "description":
                            "Workflow produces output but does not save it.",

                        "recommended_action":
                            "Add SaveImage, SaveVideo or another output node.",

                        "auto_fix_available":
                            False

                    })

                    priority_score += 30

                elif (
                    issue_type ==
                    "Orphan Node"
                ):

                    fixes.append({

                        "fix_type":
                            "Remove Orphan Node",

                        "severity":
                            "Low",

                        "node_id":
                            node_id,

                        "node_type":
                            node_type,

                        "description":
                            "Node is disconnected from workflow.",

                        "recommended_action":
                            "Delete node or reconnect it.",

                        "auto_fix_available":
                            False

                    })

                    priority_score += 5

                elif (
                    issue_type ==
                    "Dead End Node"
                ):

                    fixes.append({

                        "fix_type":
                            "Connect Dead End",

                        "severity":
                            "Medium",

                        "node_id":
                            node_id,

                        "node_type":
                            node_type,

                        "description":
                            "Node output is never consumed.",

                        "recommended_action":
                            "Connect node to downstream processing.",

                        "auto_fix_available":
                            False

                    })

                    priority_score += 10

        if dependency_graph:

            isolated_nodes = (
                dependency_graph.get(
                    "isolated_nodes",
                    []
                )
            )

            for node in isolated_nodes:

                fixes.append({

                    "fix_type":
                        "Review Isolated Node",

                    "severity":
                        "Medium",

                    "node_id":
                        node.get(
                            "node_id"
                        ),

                    "node_type":
                        node.get(
                            "node_type",
                            "Unknown"
                        ),

                    "description":
                        "Node has no dependencies and no dependents.",

                    "recommended_action":
                        "Delete node or connect it to workflow.",

                    "auto_fix_available":
                        False

                })

                priority_score += 10

        if branch_analysis:

            if (

                branch_analysis.get(
                    "max_branch_width",
                    0
                )

                > 5

            ):

                fixes.append({

                    "fix_type":
                        "Reduce Branch Width",

                    "severity":
                        "Medium",

                    "node_id":
                        None,

                    "node_type":
                        "Workflow",

                    "description":
                        "Workflow contains excessive branching.",

                    "recommended_action":
                        "Split workflow into reusable modules.",

                    "auto_fix_available":
                        False

                })

                priority_score += 15

        save_nodes = []

        for node in nodes:

            node_type = node.get(
                "type",
                ""
            )

            if (
                node_type
                in
                self.SAVE_NODE_TYPES
            ):

                save_nodes.append(
                    node
                )

        if len(save_nodes) == 0:

            fixes.append({

                "fix_type":
                    "Add Save Node",

                "severity":
                    "High",

                "node_id":
                    None,

                "node_type":
                    "Workflow",

                "description":
                    "Workflow has no output node.",

                "recommended_action":
                    "Add SaveImage, SaveVideo or another save node.",

                "auto_fix_available":
                    False

            })

            priority_score += 25

        if priority_score <= 15:

            workflow_risk = (
                "Low"
            )

        elif priority_score <= 50:

            workflow_risk = (
                "Medium"
            )

        else:

            workflow_risk = (
                "High"
            )

        insights = []

        if len(fixes) == 0:

            insights.append(
                "No fixes required."
            )

        else:

            insights.append(

                f"{len(fixes)} potential fixes detected."

            )

        insights.append(

            f"Workflow risk level is {workflow_risk}."

        )

        return {

            "fixes":
                fixes,

            "fix_count":
                len(
                    fixes
                ),

            "priority_score":
                priority_score,

            "workflow_risk":
                workflow_risk,

            "insights":
                insights

        }