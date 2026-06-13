class ImpactAnalysisEngine:

    IGNORED_NODES = {

        "WorkflowInspector",

        "WorkflowDocumentationGenerator",

        "WorkflowOptimizer",

        "WorkflowComparator"

    }

    def analyze(
        self,
        nodes,
        links
    ):

        node_map = {}

        incoming = {}

        outgoing = {}

        for node in nodes:

            node_id = node.get(
                "id"
            )

            node_type = node.get(
                "type",
                ""
            )

            if (
                node_type
                in
                self.IGNORED_NODES
            ):
                continue

            node_map[
                node_id
            ] = node

            incoming[
                node_id
            ] = []

            outgoing[
                node_id
            ] = []

        for link in links:

            if (
                not isinstance(
                    link,
                    list
                )
            ):
                continue

            if len(link) < 4:
                continue

            source_id = link[1]
            target_id = link[3]

            if (
                source_id not in node_map
                or
                target_id not in node_map
            ):
                continue

            outgoing[
                source_id
            ].append(
                target_id
            )

            incoming[
                target_id
            ].append(
                source_id
            )

        impact_results = []

        for node_id, node in node_map.items():

            dependency_count = len(
                incoming.get(
                    node_id,
                    []
                )
            )

            dependent_count = len(
                outgoing.get(
                    node_id,
                    []
                )
            )

            affected_branches = max(
                dependency_count,
                dependent_count
            )

            if (
                dependency_count == 0
                and
                dependent_count == 0
            ):

                risk = "Low"

                safe_to_remove = True

            elif (
                dependency_count <= 1
                and
                dependent_count <= 1
            ):

                risk = "Medium"

                safe_to_remove = False

            else:

                risk = "High"

                safe_to_remove = False

            impact_results.append({

                "node_id":
                    node_id,

                "node_type":
                    node.get(
                        "type",
                        "Unknown"
                    ),

                "dependencies":
                    dependency_count,

                "dependents":
                    dependent_count,

                "affected_branches":
                    affected_branches,

                "risk":
                    risk,

                "safe_to_remove":
                    safe_to_remove

            })

        low_risk_nodes = len(
            [
                x
                for x
                in impact_results
                if x["risk"] == "Low"
            ]
        )

        medium_risk_nodes = len(
            [
                x
                for x
                in impact_results
                if x["risk"] == "Medium"
            ]
        )

        high_risk_nodes = len(
            [
                x
                for x
                in impact_results
                if x["risk"] == "High"
            ]
        )

        safe_removal_candidates = len(
            [
                x
                for x
                in impact_results
                if x["safe_to_remove"]
            ]
        )

        insights = []

        insights.append(
            f"{safe_removal_candidates} node(s) can be safely removed."
        )

        insights.append(
            f"{high_risk_nodes} high-risk node(s) detected."
        )

        insights.append(
            f"{medium_risk_nodes} medium-risk node(s) detected."
        )

        insights.append(
            f"{low_risk_nodes} low-risk node(s) detected."
        )

        return {

            "nodes":
                impact_results,

            "safe_removal_candidates":
                safe_removal_candidates,

            "low_risk_nodes":
                low_risk_nodes,

            "medium_risk_nodes":
                medium_risk_nodes,

            "high_risk_nodes":
                high_risk_nodes,

            "insights":
                insights

        }