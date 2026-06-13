import {
    locateNode
}
from "./node_explorer.js";

export function buildAutoFix(
    autoFixData
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.style.padding =
        "10px";

    const fixCount =
        autoFixData?.fix_count ??
        0;

    const priorityScore =
        autoFixData?.priority_score ??
        0;

    const workflowRisk =
        autoFixData?.workflow_risk ??
        "Unknown";

    let riskColor =
        "#00cc66";

    if (
        workflowRisk ===
        "Medium"
    )
    {
        riskColor =
            "#ffaa00";
    }

    if (
        workflowRisk ===
        "High"
    )
    {
        riskColor =
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
                    Fix Count
                </h3>

                <h1>
                    ${fixCount}
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
                    Priority Score
                </h3>

                <h1>
                    ${priorityScore}
                </h1>
            </div>

        </div>

        <div
            style="
                background:#252526;
                border:1px solid #444;
                border-radius:10px;
                padding:15px;
                margin-bottom:20px;
            "
        >
            <h3>
                Workflow Risk
            </h3>

            <h2
                style="
                    color:${riskColor};
                "
            >
                ${workflowRisk}
            </h2>
        </div>
        `;

    const fixesSection =
        document.createElement(
            "div"
        );

    fixesSection.style.background =
        "#252526";

    fixesSection.style.border =
        "1px solid #444";

    fixesSection.style.borderRadius =
        "10px";

    fixesSection.style.padding =
        "15px";

    fixesSection.style.marginBottom =
        "20px";

    fixesSection.innerHTML =
        `
        <h3>
            Recommended Actions
        </h3>
        `;

    const fixes =
        autoFixData?.fixes ??
        [];

    if (
        fixes.length === 0
    )
    {
        fixesSection.innerHTML +=
            `
            <p>
                No fixes required.
            </p>
            `;
    }
    else
    {
        fixes.forEach(
            fix =>
            {
                const card =
                    document.createElement(
                        "div"
                    );

                let borderColor =
                    "#00cc66";

                if (
                    fix.severity ===
                    "Medium"
                )
                {
                    borderColor =
                        "#ffaa00";
                }

                if (
                    fix.severity ===
                    "High"
                )
                {
                    borderColor =
                        "#ff4444";
                }

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
                        ${fix.fix_type}
                    </h4>

                    <p>
                        <b>Severity:</b>
                        ${fix.severity}
                    </p>

                    <p>
                        <b>Node:</b>
                        ${fix.node_type}
                    </p>

                    <p>
                        <b>Node ID:</b>
                        ${
                            fix.node_id ??
                            "N/A"
                        }
                    </p>

                    <p>
                        <b>Description:</b>
                        ${fix.description}
                    </p>

                    <p>
                        <b>Recommended Action:</b>
                        ${fix.recommended_action}
                    </p>

                    <p>
                        <b>Action Available:</b>
                        ${
                            fix.auto_fix_available
                            ?
                            "Yes"
                            :
                            "No"
                        }
                    </p>
                    `;

                if (
                    fix.node_id !== null &&
                    fix.node_id !== undefined
                )
                {
                    const button =
                        document.createElement(
                            "button"
                        );

                    button.innerText =
                        "Locate Node";

                    button.style.marginTop =
                        "10px";

                    button.onclick =
                        () =>
                        {
                            locateNode(
                                fix.node_id
                            );
                        };

                    card.appendChild(
                        button
                    );
                }

                fixesSection.appendChild(
                    card
                );
            }
        );
    }

    wrapper.appendChild(
        fixesSection
    );

    const insightsSection =
        document.createElement(
            "div"
        );

    insightsSection.style.background =
        "#252526";

    insightsSection.style.border =
        "1px solid #444";

    insightsSection.style.borderRadius =
        "10px";

    insightsSection.style.padding =
        "15px";

    insightsSection.innerHTML =
        `
        <h3>
            Advisor Insights
        </h3>
        `;

    const list =
        document.createElement(
            "ul"
        );

    const insights =
        autoFixData?.insights ??
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

    insightsSection.appendChild(
        list
    );

    wrapper.appendChild(
        insightsSection
    );

    return wrapper;
}