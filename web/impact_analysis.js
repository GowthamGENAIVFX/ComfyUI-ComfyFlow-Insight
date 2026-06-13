import {
    locateNode
}
from "./node_explorer.js";

export function buildImpactAnalysis(
    impactData
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.style.padding =
        "10px";

    const safeRemovalCandidates =
        impactData?.safe_removal_candidates ??
        0;

    const lowRiskNodes =
        impactData?.low_risk_nodes ??
        0;

    const mediumRiskNodes =
        impactData?.medium_risk_nodes ??
        0;

    const highRiskNodes =
        impactData?.high_risk_nodes ??
        0;

    wrapper.innerHTML =
        `
        <h2>
            Impact Analysis
        </h2>

        <div
            style="
                display:grid;
                grid-template-columns:
                    repeat(
                        auto-fit,
                        minmax(
                            220px,
                            1fr
                        )
                    );
                gap:12px;
                margin-bottom:20px;
            "
        >

            <div
                style="
                    background:#252526;
                    border:1px solid #444;
                    border-radius:10px;
                    padding:15px;
                "
            >
                <h3>
                    Safe Removal
                </h3>

                <h1
                    style="
                        color:#00cc66;
                    "
                >
                    ${safeRemovalCandidates}
                </h1>
            </div>

            <div
                style="
                    background:#252526;
                    border:1px solid #444;
                    border-radius:10px;
                    padding:15px;
                "
            >
                <h3>
                    Low Risk
                </h3>

                <h1
                    style="
                        color:#00cc66;
                    "
                >
                    ${lowRiskNodes}
                </h1>
            </div>

            <div
                style="
                    background:#252526;
                    border:1px solid #444;
                    border-radius:10px;
                    padding:15px;
                "
            >
                <h3>
                    Medium Risk
                </h3>

                <h1
                    style="
                        color:#ffaa00;
                    "
                >
                    ${mediumRiskNodes}
                </h1>
            </div>

            <div
                style="
                    background:#252526;
                    border:1px solid #444;
                    border-radius:10px;
                    padding:15px;
                "
            >
                <h3>
                    High Risk
                </h3>

                <h1
                    style="
                        color:#ff4444;
                    "
                >
                    ${highRiskNodes}
                </h1>
            </div>

        </div>
        `;

    const nodeSection =
        document.createElement(
            "div"
        );

    nodeSection.style.background =
        "#252526";

    nodeSection.style.border =
        "1px solid #444";

    nodeSection.style.borderRadius =
        "10px";

    nodeSection.style.padding =
        "15px";

    nodeSection.style.marginBottom =
        "20px";

    nodeSection.innerHTML =
        `
        <h3>
            Node Impact Report
        </h3>
        `;

    const nodes =
        impactData?.nodes ??
        [];

    if (
        nodes.length === 0
    )
    {
        nodeSection.innerHTML +=
            `
            <p>
                No impact data available.
            </p>
            `;
    }
    else
    {
        nodes.forEach(
            node =>
            {
                let borderColor =
                    "#00cc66";

                if (
                    node.risk ===
                    "Medium"
                )
                {
                    borderColor =
                        "#ffaa00";
                }

                if (
                    node.risk ===
                    "High"
                )
                {
                    borderColor =
                        "#ff4444";
                }

                const card =
                    document.createElement(
                        "div"
                    );

                card.style.border =
                    `1px solid ${borderColor}`;

                card.style.borderRadius =
                    "8px";

                card.style.padding =
                    "12px";

                card.style.marginBottom =
                    "12px";

                card.innerHTML =
                    `
                    <h4>
                        ${node.node_type}
                    </h4>

                    <p>
                        <b>Node ID:</b>
                        ${node.node_id}
                    </p>

                    <p>
                        <b>Dependencies:</b>
                        ${node.dependencies}
                    </p>

                    <p>
                        <b>Dependents:</b>
                        ${node.dependents}
                    </p>

                    <p>
                        <b>Affected Branches:</b>
                        ${node.affected_branches}
                    </p>

                    <p>
                        <b>Risk:</b>
                        ${node.risk}
                    </p>

                    <p>
                        <b>Safe To Remove:</b>
                        ${
                            node.safe_to_remove
                            ?
                            "Yes"
                            :
                            "No"
                        }
                    </p>
                    `;

                const locateButton =
                    document.createElement(
                        "button"
                    );

                locateButton.innerText =
                    "Locate Node";

                locateButton.style.marginTop =
                    "10px";

                locateButton.onclick =
                    () =>
                    {
                        locateNode(
                            node.node_id
                        );
                    };

                card.appendChild(
                    locateButton
                );

                nodeSection.appendChild(
                    card
                );
            }
        );
    }

    wrapper.appendChild(
        nodeSection
    );

    const insightSection =
        document.createElement(
            "div"
        );

    insightSection.style.background =
        "#252526";

    insightSection.style.border =
        "1px solid #444";

    insightSection.style.borderRadius =
        "10px";

    insightSection.style.padding =
        "15px";

    insightSection.innerHTML =
        `
        <h3>
            Impact Insights
        </h3>
        `;

    const list =
        document.createElement(
            "ul"
        );

    const insights =
        impactData?.insights ??
        [];

    insights.forEach(
        insight =>
        {
            const item =
                document.createElement(
                    "li"
                );

            item.innerText =
                insight;

            list.appendChild(
                item
            );
        }
    );

    insightSection.appendChild(
        list
    );

    wrapper.appendChild(
        insightSection
    );

    return wrapper;
}