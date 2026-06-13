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

export function buildWorkflowRepair(
    repairData
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.style.padding =
        "12px";

    const riskScore =
        repairData?.risk_score ??
        0;

    const repairCount =
        repairData?.repair_count ??
        0;

    const safeRepairs =
        repairData?.safe_repairs ??
        [];

    const manualRepairs =
        repairData?.manual_repairs ??
        [];

    const healthStatus =
        repairData?.health_status ??
        "Unknown";

    wrapper.innerHTML =
        `
        <h2>
            Workflow Repair Center
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
                    Risk Score
                </h3>

                <h1>
                    ${riskScore}
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
                    Repair Count
                </h3>

                <h1>
                    ${repairCount}
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
                    Safe Repairs
                </h3>

                <h1>
                    ${safeRepairs.length}
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

                <h2>
                    ${healthStatus}
                </h2>
            </div>

        </div>
        `;

    const safeSection =
        document.createElement(
            "div"
        );

    safeSection.style.background =
        "#252526";

    safeSection.style.border =
        "1px solid #444";

    safeSection.style.borderRadius =
        "10px";

    safeSection.style.padding =
        "15px";

    safeSection.style.marginBottom =
        "20px";

    safeSection.innerHTML =
        `
        <h3>
            Safe Repairs
        </h3>
        `;

    if (
        safeRepairs.length === 0
    )
    {
        safeSection.innerHTML +=
            `
            <p>
                No safe repairs available.
            </p>
            `;
    }
    else
    {
        safeRepairs.forEach(
            repair =>
            {
                const card =
                    document.createElement(
                        "div"
                    );

                card.style.border =
                    "1px solid #00cc66";

                card.style.borderRadius =
                    "8px";

                card.style.padding =
                    "12px";

                card.style.marginBottom =
                    "12px";

                card.innerHTML =
                    `
                    <h4>
                        ${repair.issue_type}
                    </h4>

                    <p>
                        <b>Node:</b>
                        ${repair.node_type}
                    </p>

                    <p>
                        <b>Action:</b>
                        ${repair.recommended_action}
                    </p>

                    <p>
                        <b>Preview:</b>
                        ${repair.preview}
                    </p>
                    `;

                const locateButton =
                    document.createElement(
                        "button"
                    );

                locateButton.innerText =
                    "Locate Node";

                locateButton.onclick =
                    () =>
                    {
                        locateNode(
                            repair.node_id
                        );
                    };

                card.appendChild(
                    locateButton
                );

                safeSection.appendChild(
                    card
                );
            }
        );
    }

    wrapper.appendChild(
        safeSection
    );

    const manualSection =
        document.createElement(
            "div"
        );

    manualSection.style.background =
        "#252526";

    manualSection.style.border =
        "1px solid #444";

    manualSection.style.borderRadius =
        "10px";

    manualSection.style.padding =
        "15px";

    manualSection.style.marginBottom =
        "20px";

    manualSection.innerHTML =
        `
        <h3>
            Manual Review Required
        </h3>
        `;

    if (
        manualRepairs.length === 0
    )
    {
        manualSection.innerHTML +=
            `
            <p>
                No manual review items.
            </p>
            `;
    }
    else
    {
        manualRepairs.forEach(
            repair =>
            {
                const card =
                    document.createElement(
                        "div"
                    );

                card.style.border =
                    `1px solid ${
                        getRiskColor(
                            repair.risk
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
                        ${repair.issue_type}
                    </h4>

                    <p>
                        <b>Node:</b>
                        ${repair.node_type}
                    </p>

                    <p>
                        <b>Risk:</b>
                        ${repair.risk}
                    </p>

                    <p>
                        <b>Action:</b>
                        ${repair.recommended_action}
                    </p>

                    <p>
                        <b>Preview:</b>
                        ${repair.preview}
                    </p>
                    `;

                const locateButton =
                    document.createElement(
                        "button"
                    );

                locateButton.innerText =
                    "Locate Node";

                locateButton.onclick =
                    () =>
                    {
                        locateNode(
                            repair.node_id
                        );
                    };

                card.appendChild(
                    locateButton
                );

                manualSection.appendChild(
                    card
                );
            }
        );
    }

    wrapper.appendChild(
        manualSection
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
            Repair Insights
        </h3>
        `;

    const list =
        document.createElement(
            "ul"
        );

    (
        repairData?.insights ||
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

    insightsSection.appendChild(
        list
    );

    wrapper.appendChild(
        insightsSection
    );

    return wrapper;
}