import {
    buildNodeExplorer,
    locateNode
}
from "./node_explorer.js";

import {
    buildArchitectureAnalyzer
}
from "./architecture_analyzer.js";

import {
    buildWorkflowStatistics
}
from "./workflow_statistics.js";

import {
    buildBranchAnalyzer
}
from "./branch_analyzer.js";

import {
    buildDependencyGraph
}
from "./dependency_graph.js";

import {
    buildWorkflowAdvisor
}
from "./workflow_advisor.js";

import {
    buildWorkflowActions
}
from "./workflow_actions.js";

let dashboardWindow = null;

function createTabButton(
    title,
    onClick,
    container
)
{
    const button =
        document.createElement(
            "button"
        );

    button.innerText =
        title;

    button.style.marginRight =
        "8px";

    button.style.padding =
        "8px";

    button.style.cursor =
        "pointer";

    button.style.background =
        "#333";

    button.style.color =
        "#fff";

    button.style.border =
        "1px solid #555";

    button.style.borderRadius =
        "6px";

    button.onclick =
        onClick;

    container.appendChild(
        button
    );
}

function getRiskColor(
    risk
)
{
    if (
        risk === "High"
    )
    {
        return "#ff4444";
    }

    if (
        risk === "Medium"
    )
    {
        return "#ffaa00";
    }

    return "#00cc66";
}

function buildHealthAnalyzer(
    healthData
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    const score =
        healthData?.score ?? 0;

    const status =
        healthData?.status ??
        "Unknown";

    let statusColor =
        "#ff4444";

    if (
        score >= 90
    )
    {
        statusColor =
            "#00cc66";
    }
    else if (
        score >= 70
    )
    {
        statusColor =
            "#ffaa00";
    }

    wrapper.innerHTML =
        `
        <h2>
            Workflow Health Analyzer
        </h2>

        <div
            style="
                padding:20px;
                border:1px solid #444;
                border-radius:10px;
                margin-bottom:20px;
                background:#252526;
            "
        >

            <h1
                style="
                    color:${statusColor};
                    margin:0;
                "
            >
                ${score}/100
            </h1>

            <h3>
                Status:
                ${status}
            </h3>

            <p>
                <b>Orphan Nodes:</b>
                ${healthData.orphan_nodes || 0}
            </p>

            <p>
                <b>Dead End Nodes:</b>
                ${healthData.dead_end_nodes || 0}
            </p>

            <p>
                <b>Save Nodes:</b>
                ${healthData.save_nodes || 0}
            </p>

            <p>
                <b>Exit Nodes:</b>
                ${healthData.exit_nodes || 0}
            </p>

        </div>
        `;

    const warningTitle =
        document.createElement(
            "h3"
        );

    warningTitle.innerText =
        "Warnings";

    wrapper.appendChild(
        warningTitle
    );

    const warningList =
        document.createElement(
            "ul"
        );

    const warnings =
        healthData.warnings || [];

    if (
        warnings.length === 0
    )
    {
        const item =
            document.createElement(
                "li"
            );

        item.innerText =
            "No issues detected";

        warningList.appendChild(
            item
        );
    }
    else
    {
        warnings.forEach(
            warning =>
            {
                const item =
                    document.createElement(
                        "li"
                    );

                item.innerText =
                    warning;

                warningList.appendChild(
                    item
                );
            }
        );
    }

    wrapper.appendChild(
        warningList
    );

    const issueTitle =
        document.createElement(
            "h3"
        );

    issueTitle.style.marginTop =
        "25px";

    issueTitle.innerText =
        "Workflow Debugger";

    wrapper.appendChild(
        issueTitle
    );

    const issues =
        healthData.issues || [];

    if (
        issues.length === 0
    )
    {
        const successCard =
            document.createElement(
                "div"
            );

        successCard.style.padding =
            "15px";

        successCard.style.marginTop =
            "10px";

        successCard.style.border =
            "1px solid #00cc66";

        successCard.style.borderRadius =
            "8px";

        successCard.style.background =
            "#1f2b1f";

        successCard.innerHTML =
            `
            <h3>
                No Issues Found
            </h3>

            <p>
                Workflow looks healthy.
            </p>
            `;

        wrapper.appendChild(
            successCard
        );

        return wrapper;
    }

    issues.forEach(
        issue =>
        {
            const card =
                document.createElement(
                    "div"
                );

            card.style.border =
                "1px solid #444";

            card.style.borderRadius =
                "10px";

            card.style.padding =
                "15px";

            card.style.marginBottom =
                "15px";

            card.style.background =
                "#252526";

            const riskColor =
                getRiskColor(
                    issue.risk
                );

            card.innerHTML =
                `
                <h3>
                    ${issue.issue_type}
                </h3>

                <p>
                    <b>Node:</b>
                    ${issue.node_type}
                </p>

                <p>
                    <b>Node ID:</b>
                    ${issue.node_id ?? "N/A"}
                </p>

                <p>
                    <b>Risk:</b>

                    <span
                        style="
                            color:${riskColor};
                            font-weight:bold;
                        "
                    >
                        ${issue.risk}
                    </span>
                </p>

                <p>
                    <b>Reason:</b>
                    ${issue.reason}
                </p>

                <p>
                    <b>Recommendation:</b>
                    ${issue.recommendation}
                </p>
                `;

            if (
                issue.node_id !== null &&
                issue.node_id !== undefined
            )
            {
                const locateButton =
                    document.createElement(
                        "button"
                    );

                locateButton.innerText =
                    "Locate Node";

                locateButton.style.marginTop =
                    "10px";

                locateButton.style.padding =
                    "8px";

                locateButton.style.cursor =
                    "pointer";

                locateButton.onclick =
                    () =>
                    {
                        locateNode(
                            issue.node_id
                        );
                    };

                card.appendChild(
                    locateButton
                );
            }

            wrapper.appendChild(
                card
            );
        }
    );

    return wrapper;
}

export function showDashboard(
    data
)
{
    if (
        dashboardWindow
    )
    {
        dashboardWindow.remove();
    }

    dashboardWindow =
        document.createElement(
            "div"
        );

    dashboardWindow.id =
        "comfyflow-dashboard";

    dashboardWindow.style.position =
        "fixed";

    dashboardWindow.style.top =
        "80px";

    dashboardWindow.style.left =
        "120px";

    dashboardWindow.style.width =
        "1100px";

    dashboardWindow.style.height =
        "750px";

    dashboardWindow.style.background =
        "#1e1e1e";

    dashboardWindow.style.color =
        "#ffffff";

    dashboardWindow.style.border =
        "1px solid #555";

    dashboardWindow.style.zIndex =
        "99999";

    dashboardWindow.style.resize =
        "both";

    dashboardWindow.style.overflow =
        "hidden";

    const header =
        document.createElement(
            "div"
        );

    header.style.padding =
        "12px";

    header.style.cursor =
        "move";

    header.style.background =
        "#252526";

    header.style.fontWeight =
        "bold";

    header.style.fontSize =
        "18px";

    header.innerHTML =
        `
        ComfyFlow Insight

        <span
            id="comfyflow-close"
            style="
                float:right;
                cursor:pointer;
                font-size:22px;
            "
        >
            ✖
        </span>
        `;

    dashboardWindow.appendChild(
        header
    );

    const tabs =
        document.createElement(
            "div"
        );

    tabs.style.padding =
        "10px";

    tabs.style.borderBottom =
        "1px solid #444";

    dashboardWindow.appendChild(
        tabs
    );

    const content =
        document.createElement(
            "div"
        );

    content.id =
        "comfyflow-content";

    content.style.padding =
        "15px";

    content.style.height =
        "620px";

    content.style.overflow =
        "auto";

    dashboardWindow.appendChild(
        content
    );

    document.body.appendChild(
        dashboardWindow
    );

    createTabButton(
        "Overview",
        () =>
        {
            content.innerHTML =
            `
            <h2>Workflow Overview</h2>

            <p><b>Nodes:</b> ${data.nodes}</p>

            <p><b>Links:</b> ${data.links}</p>

            <p><b>Complexity:</b> ${data.complexity}</p>

            <p><b>Health:</b> ${data.health}</p>
            `;
        },
        tabs
    );


    createTabButton(
		"Architecture",
		() =>
		{
			content.innerHTML =
				"";

			content.appendChild(
				buildArchitectureAnalyzer(
					data.architecture_analysis ||
					{},
					data.diagram ||
					""
				)
			);
		},
		tabs
	);
	createTabButton(
		"Statistics",
		() =>
		{
			content.innerHTML =
				"";

			content.appendChild(
				buildWorkflowStatistics(
					data.workflow_statistics ||
					{}
				)
			);
		},
		tabs
	);
	
	createTabButton(
		"Branch Analyzer",
		() =>
		{
			content.innerHTML =
				"";

			content.appendChild(
				buildBranchAnalyzer(
					data.branch_analysis ||
					{}
				)
			);
		},
		tabs
	);
	
	createTabButton(
		"Dependency Graph",
		() =>
		{
			content.innerHTML =
				"";

			content.appendChild(
				buildDependencyGraph(
					data.dependency_graph ||
					{}
				)
			);
		},
		tabs
	);
	createTabButton(
		"Workflow Advisor",
		() =>
		{
			content.innerHTML =
				"";

			content.appendChild(
				buildWorkflowAdvisor(
					data.workflow_advisor ||
					{}
				)
			);
		},
		tabs
	);
	createTabButton(
		"Workflow Actions",
		() =>
		{
			content.innerHTML =
				"";

			content.appendChild(
				buildWorkflowActions(
					data.workflow_actions ||
					{}
				)
			);
		},
		tabs
	);

    createTabButton(
        "Node Explorer",
        () =>
        {
            content.innerHTML =
                "";

            content.appendChild(
                buildNodeExplorer(
                    data.node_explorer
                )
            );
        },
        tabs
    );

    createTabButton(
        "Health Analyzer",
        () =>
        {
            content.innerHTML =
                "";

            content.appendChild(
                buildHealthAnalyzer(
                    data.health_analysis
                )
            );
        },
        tabs
    );

    content.innerHTML =
    `
    <h2>Workflow Overview</h2>

    <p><b>Nodes:</b> ${data.nodes}</p>

    <p><b>Links:</b> ${data.links}</p>

    <p><b>Complexity:</b> ${data.complexity}</p>

    <p><b>Health:</b> ${data.health}</p>
    `;

    document.getElementById(
        "comfyflow-close"
    ).onclick =
        () =>
        {
            dashboardWindow.remove();
            dashboardWindow = null;
        };

    let dragging =
        false;

    let offsetX =
        0;

    let offsetY =
        0;

    header.addEventListener(
        "mousedown",
        function(e)
        {
            dragging =
                true;

            offsetX =
                e.clientX -
                dashboardWindow.offsetLeft;

            offsetY =
                e.clientY -
                dashboardWindow.offsetTop;
        }
    );

    document.addEventListener(
        "mouseup",
        function()
        {
            dragging =
                false;
        }
    );

    document.addEventListener(
        "mousemove",
        function(e)
        {
            if (
                !dragging
            )
            {
                return;
            }

            dashboardWindow.style.left =
                (
                    e.clientX -
                    offsetX
                ) + "px";

            dashboardWindow.style.top =
                (
                    e.clientY -
                    offsetY
                ) + "px";
        }
    );
}