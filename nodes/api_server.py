from aiohttp import web

from server import PromptServer

from .category_engine import CategoryEngine
from .optimization_engine import OptimizationEngine
from .documentation_engine import DocumentationEngine
from .diagram_engine import DiagramEngine
from .node_explanation_engine import NodeExplanationEngine
from .optimization_notes_engine import OptimizationNotesEngine
from .file_exporter import FileExporter
from .node_explorer_engine import NodeExplorerEngine
from .health_analyzer_engine import HealthAnalyzerEngine
from .architecture_analyzer_engine import (
    ArchitectureAnalyzerEngine
)
from .workflow_statistics_engine import (
    WorkflowStatisticsEngine
)
from .branch_analyzer_engine import (
    BranchAnalyzerEngine
)
from .dependency_graph_engine import (
    DependencyGraphEngine
)
from .impact_analysis_engine import (
    ImpactAnalysisEngine
)
from .auto_fix_engine import (
    AutoFixEngine
)
from .workflow_advisor_engine import (
    WorkflowAdvisorEngine
)
from .workflow_actions_engine import (
    WorkflowActionsEngine
)
from .workflow_repair_engine import (
    WorkflowRepairEngine
)
from .export_center_engine import (
    ExportCenterEngine
)

routes = PromptServer.instance.routes


@routes.post("/comfyflow/analyze")
async def analyze_workflow(request):

    try:

        workflow = await request.json()

        nodes = workflow.get(
            "nodes",
            []
        )

        links = workflow.get(
            "links",
            []
        )

        categories = (
            CategoryEngine()
            .analyze(
                nodes
            )
        )

        optimizations = (
            OptimizationEngine()
            .analyze(
                nodes
            )
        )

        complexity = min(
            (
                len(nodes) * 5
            )
            +
            (
                len(links) * 3
            ),
            100
        )

        health = 100

        readme = (
            DocumentationEngine()
            .build_readme(
                len(nodes),
                len(links),
                complexity,
                health,
                categories,
                optimizations
            )
        )

        diagram = (
            DiagramEngine()
            .generate(
                nodes,
                links
            )
        )

        node_explanations = (
            NodeExplanationEngine()
            .build(
                nodes
            )
        )

        optimization_notes = (
            OptimizationNotesEngine()
            .build(
                optimizations
            )
        )

        node_explorer = (
            NodeExplorerEngine()
            .build(
                nodes
            )
        )

        health_analysis = (
            HealthAnalyzerEngine()
            .analyze(
                nodes,
                links
            )
        )

        architecture_analysis = (
            ArchitectureAnalyzerEngine()
            .analyze(
                nodes,
                links
            )
        )

        workflow_statistics = (
            WorkflowStatisticsEngine()
            .analyze(
                nodes,
                links,
                architecture_analysis
            )
        )

        branch_analysis = (
            BranchAnalyzerEngine()
            .analyze(
                nodes,
                links
            )
        )

        dependency_graph = (
            DependencyGraphEngine()
            .analyze(
                nodes,
                links
            )
        )

        impact_analysis = (
            ImpactAnalysisEngine()
            .analyze(
                nodes,
                links
            )
        )

        auto_fix_analysis = (
            AutoFixEngine()
            .analyze(
                nodes,
                links,
                health_analysis,
                branch_analysis,
                dependency_graph
            )
        )

        workflow_advisor = (
            WorkflowAdvisorEngine()
            .analyze(
                health_analysis,
                branch_analysis,
                dependency_graph,
                auto_fix_analysis,
                impact_analysis
            )
        )

        workflow_actions = (
            WorkflowActionsEngine()
            .analyze(
                nodes,
                links
            )
        )

        workflow_repair = (
            WorkflowRepairEngine()
            .analyze(
                nodes,
                links,
                health_analysis,
                dependency_graph,
                impact_analysis
            )
        )

        export_center = (
            ExportCenterEngine()
            .analyze(
                nodes,
                links,
                architecture_analysis,
                workflow_statistics,
                health_analysis,
                dependency_graph,
                workflow_advisor,
                workflow_repair
            )
        )

        export_path = (
            FileExporter()
            .export(
                readme,
                diagram,
                node_explanations,
                optimization_notes
            )
        )

        return web.json_response({

            "success":
                True,

            "nodes":
                len(nodes),

            "links":
                len(links),

            "complexity":
                complexity,

            "health":
                health,

            "categories":
                categories,

            "optimizations":
                optimizations,

            "readme":
                readme,

            "diagram":
                diagram,

            "node_explanations":
                node_explanations,

            "optimization_notes":
                optimization_notes,

            "node_explorer":
                node_explorer,

            "health_analysis":
                health_analysis,

            "architecture_analysis":
                architecture_analysis,

            "workflow_statistics":
                workflow_statistics,

            "branch_analysis":
                branch_analysis,

            "dependency_graph":
                dependency_graph,

            "impact_analysis":
                impact_analysis,

            "auto_fix_analysis":
                auto_fix_analysis,

            "workflow_advisor":
                workflow_advisor,

            "workflow_actions":
                workflow_actions,

            "workflow_repair":
                workflow_repair,

            "export_center":
                export_center,

            "raw_workflow":
                workflow,

            "export_path":
                export_path

        })

    except Exception as e:

        return web.json_response({

            "success":
                False,

            "error":
                str(e)

        })