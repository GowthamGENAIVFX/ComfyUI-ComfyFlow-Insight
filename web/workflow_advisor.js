import {
    locateNode
}
from "./node_explorer.js";

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

export function buildWorkflowAdvisor(
    advisorData
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.style.padding =
        "12px";

    const score =
        advisorData?.advisor_score ??
        0;

    const grade =
        advisorData?.workflow_grade ??
        "N/A";

    const status =
        advisorData?.workflow_status ??
        "Unknown";

    const riskAssessment =
        advisorData?.risk_assessment ??
        {};

    const safeRemovalCandidates =
        advisorData?.safe_removal_candidates ??
        0;

    let scoreColor =
        "#00cc66";

    if (
        score < 75
    )
    {
        scoreColor =
            "#ffaa00";
    }

    if (
        score < 60
    )
    {
        scoreColor =
            "#ff4444";
    }

    wrapper.innerHTML =
        `
        <h2>
            Workflow Advisor
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
                    Advisor Score
                </h3>

                <h1
                    style="
                        color:${scoreColor};
                    "
                >
                    ${score}/100
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
                    Workflow Grade
                </h3>

                <h1>
                    ${grade}
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
                    Status
                </h3>

                <h3>
                    ${status}
                </h3>
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

        </div>
        `;

    const riskSection =
        document.createElement(
            "div"
        );

    riskSection.style.background =
        "#252526";

    riskSection.style.border =
        "1px solid #444";

    riskSection.style.borderRadius =
        "10px";

    riskSection.style.padding =
        "15px";

    riskSection.style.marginBottom =
        "20px";

    riskSection.innerHTML =
        `
        <h3>
            Risk Assessment
        </h3>

        <p>
            <b>High Risk Nodes:</b>
            ${riskAssessment.high_risk_nodes ?? 0}
        </p>

        <p>
            <b>Medium Risk Nodes:</b>
            ${riskAssessment.medium_risk_nodes ?? 0}
        </p>

        <p>
            <b>Safe Removal Candidates:</b>
            ${riskAssessment.safe_removal_candidates ?? 0}
        </p>

        <p>
            <b>Branch Complexity:</b>
            ${riskAssessment.branch_complexity ?? "Unknown"}
        </p>

        <p>
            <b>Dependency Complexity:</b>
            ${riskAssessment.dependency_complexity ?? "Unknown"}
        </p>
        `;

    wrapper.appendChild(
        riskSection
    );

    const recommendationSection =
        document.createElement(
            "div"
        );

    recommendationSection.style.background =
        "#252526";

    recommendationSection.style.border =
        "1px solid #444";

    recommendationSection.style.borderRadius =
        "10px";

    recommendationSection.style.padding =
        "15px";

    recommendationSection.style.marginBottom =
        "20px";

    recommendationSection.innerHTML =
        `
        <h3>
            Recommendations
        </h3>
        `;

    const recommendations =
        advisorData?.recommendations ??
        [];

    if (
        recommendations.length === 0
    )
    {
        recommendationSection.innerHTML +=
            `
            <p>
                No recommendations available.
            </p>
            `;
    }
    else
    {
        recommendations.forEach(
            recommendation =>
            {
                const card =
                    document.createElement(
                        "div"
                    );

                card.style.border =
                    `1px solid ${
                        getRiskColor(
                            recommendation.severity
                        )
                    }`;

                card.style.borderRadius =
                    "8px";

                card.style.padding =
                    "12px";

                card.style.marginBottom =
                    "12px";

                let impactHtml =
                    "";

                if (
                    recommendation.impact
                )
                {
                    impactHtml =
                        `
                        <hr>

                        <p>
                            <b>Dependencies:</b>
                            ${recommendation.impact.dependencies}
                        </p>

                        <p>
                            <b>Dependents:</b>
                            ${recommendation.impact.dependents}
                        </p>

                        <p>
                            <b>Affected Branches:</b>
                            ${recommendation.impact.affected_branches}
                        </p>

                        <p>
                            <b>Risk:</b>
                            ${recommendation.impact.risk}
                        </p>

                        <p>
                            <b>Safe To Remove:</b>
                            ${
                                recommendation
                                .impact
                                .safe_to_remove
                                ?
                                "Yes"
                                :
                                "No"
                            }
                        </p>
                        `;
                }

                card.innerHTML =
                    `
                    <h4>
                        ${recommendation.title}
                    </h4>

                    <p>
                        <b>Severity:</b>
                        ${recommendation.severity}
                    </p>

                    <p>
                        <b>Node:</b>
                        ${recommendation.node_type}
                    </p>

                    <p>
                        <b>Description:</b>
                        ${recommendation.description}
                    </p>

                    <p>
                        <b>Recommended Action:</b>
                        ${recommendation.recommended_action}
                    </p>

                    ${impactHtml}
                    `;

                if (
                    recommendation.node_id !==
                    undefined
                    &&
                    recommendation.node_id !==
                    null
                )
                {
                    const button =
                        document.createElement(
                            "button"
                        );

                    button.innerText =
                        "Locate Node";

                    button.onclick =
                        () =>
                        {
                            locateNode(
                                recommendation.node_id
                            );
                        };

                    card.appendChild(
                        button
                    );
                }

                recommendationSection
                .appendChild(
                    card
                );
            }
        );
    }

    wrapper.appendChild(
        recommendationSection
    );

    const impactSection =
        document.createElement(
            "div"
        );

    impactSection.style.background =
        "#252526";

    impactSection.style.border =
        "1px solid #444";

    impactSection.style.borderRadius =
        "10px";

    impactSection.style.padding =
        "15px";

    impactSection.style.marginBottom =
        "20px";

    impactSection.innerHTML =
        `
        <h3>
            Impact Analysis
        </h3>
        `;

    const impactNodes =
        advisorData?.impact_analysis ??
        [];

    impactNodes.forEach(
        node =>
        {
            const card =
                document.createElement(
                    "div"
                );

            card.style.border =
                `1px solid ${
                    getRiskColor(
                        node.risk
                    )
                }`;

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

            const button =
                document.createElement(
                    "button"
                );

            button.innerText =
                "Locate Node";

            button.onclick =
                () =>
                {
                    locateNode(
                        node.node_id
                    );
                };

            card.appendChild(
                button
            );

            impactSection.appendChild(
                card
            );
        }
    );

    wrapper.appendChild(
        impactSection
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
            Advisor Insights
        </h3>
        `;

    const list =
        document.createElement(
            "ul"
        );

    (
        advisorData?.insights ||
        []
    )
    .forEach(
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