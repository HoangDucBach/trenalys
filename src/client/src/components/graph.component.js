import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import {Bar, Doughnut, Pie} from "react-chartjs-2";
import {useMediaQuery} from "react-responsive";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,

    ArcElement
);
const css = {
    colorHighlight: '#6946CB',
    tooltipBackground: '#AE92FF',
    tooltipFontColor: '#222222',
}
export function TrendBarGraphDemo({trend}) {
    const data = {
        labels: trend.electionBallots.map(ballot => ballot.name),
        datasets: [
            {
                label: 'Votes',
                data: trend.electionBallots.map(ballot => ballot.numberOfVotes),
                backgroundColor: css.colorHighlight,
                border: 'none',
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    };
    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                backgroundColor: css.tooltipBackground,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 8,
                padding: 10,
                displayColors: false,
                bodyColor: css.tooltipFontColor,
                titleColor: css.tooltipFontColor,
                titleFont: {
                    size: 14,
                    weight: 600,
                    family: 'DM Sans',
                    color: css.tooltipFontColor,
                },
                bodyFont: {
                    size: 14,
                    weight: 400,
                    family: 'DM Sans',
                    color: css.tooltipFontColor,
                },
            },
        },
        scales: {
            y: {
                display: false,
                beginAtZero: true,
            },
            x: {
                display: false,
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <Bar data={data} options={options} width={'100%'} height={'100%'}/>
    );
}

export function TrendGraph({trend, type}) {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 980px)'});

    let data, options;

    function generateShortLabel(input) {
        const words = input.split(' ');
        const initials = words.map(word => word[0]);
        return initials.join('').toUpperCase();
    }

    if (type === 'bar') {
        const max = Math.max(...trend.electionBallots.map(ballot => ballot.numberOfVotes));
        const roundedMax = Math.ceil(max / 1000) * 10;
        data = {
            labels: trend.electionBallots.map(ballot => generateShortLabel(ballot.name)),
            datasets: [
                {
                    label: 'Votes',
                    data: trend.electionBallots.map(ballot => ballot.numberOfVotes),
                    backgroundColor: css.colorHighlight,
                    border: 'none',
                    borderRadius: 8,
                    borderSkipped: false,
                },
            ],
        };
        options = {
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: css.tooltipBackground,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 8,
                    padding: 10,
                    displayColors: false,
                    bodyColor: css.tooltipFontColor,
                    titleColor: css.tooltipFontColor,
                    titleFont: {
                        size: 14,
                        weight: 600,
                        family: 'DM Sans',
                        color: css.tooltipFontColor,
                    },
                    bodyFont: {
                        size: 14,
                        weight: 400,
                        family: 'DM Sans',
                        color: css.tooltipFontColor,
                    },
                },
            },
            scales: {
                x: {
                    beginAtZero: true,
                    border: {
                        display: false,
                    },
                    grid: {
                        color: 'transparent',
                    },
                    ticks: {
                        font: {
                            family: 'DM Sans',
                        },
                    },
                },
                y: {
                    min: 0,
                    max: roundedMax,

                    beginAtZero: true,
                    border: {
                        display: false,
                    },
                    grid: {
                        color: 'transparent',
                        tickLength: 100,

                    },
                    yAxisID: 'y',
                    ticks: {
                        type: 'linear',
                        stepSize: 50,
                        font: {
                            family: 'DM Sans',
                        },
                    }
                },

            },

            maintainAspectRatio: false,
            responsive: true,
        };
    } else if (type === 'pie') {
        data = {
            labels: trend.electionBallots.map(ballot => ballot.name),
            datasets: [
                {
                    data: trend.electionBallots.map(ballot => ballot.numberOfVotes),
                    backgroundColor: [css.colorHighlight, 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.4)'],
                    hoverOffset: 10,
                },
            ],
        };
        options = {
            plugins: {
                legend: {
                    position: isTabletOrMobile ? 'bottom' : 'right',
                    labels: {
                        boxWidth: 15,
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 14,
                            family: 'DM Sans',
                        },
                    },
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: css.tooltipBackground,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 8,
                    padding: 10,
                    displayColors: false,
                    bodyColor: css.tooltipFontColor,
                    titleColor: css.tooltipFontColor,
                    titleFont: {
                        size: 14,
                        weight: 600,
                        family: 'DM Sans',
                        color: css.tooltipFontColor,
                    },
                    bodyFont: {
                        size: 14,
                        weight: 400,
                        family: 'DM Sans',
                        color: css.tooltipFontColor,
                    },
                },
            },
            maintainAspectRatio: isTabletOrMobile,
            responsive: true,
        };
    }

    return (
        <div className="trend-graph"
             style={{width: '100%', height: '100%'}}
        >
            {type === 'bar' && <Bar data={data} options={options} width={'100%'} height={'100%'}/>}
            {type === 'pie' && <Doughnut data={data} options={options} width={'100%'} height={'100%'}/>}
        </div>
    );
}

export function StatusGraphComponent({trend, typeGraph}) {
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div
            className="status-graph-component">
            <div className="container-status-graph-component__header">
                <div className="container-status-graph-component__title">
                    <h1
                        className="title-custom"
                        style={{
                            color: '#6E6E6E',
                            fontWeight: 600,
                        }}>
                        {capitalize(typeGraph)} Chart
                    </h1>
                </div>
                <div className="container-status-graph-component__detail">
                    <h1 className="title-custom">{trend.numberOfVotes} votes</h1>
                </div>
            </div>
        </div>
    )

}