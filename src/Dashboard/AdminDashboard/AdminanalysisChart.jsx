import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AdminanalysisChart = ({ stats }) => {
    const data = {
        labels: ["Pending", "Inprogress", "Done", "Canceled"],
        datasets: [
            {
                label: "Blood Requests",
                data: [stats.pending, stats.inprogress, stats.done, stats.canceled],
                backgroundColor: [
                    "#fef08a", 
                    "#bfdbfe", 
                    "#22c55e", 
                    "#f87171", 
                ],
                borderColor: ["#fcd34d", "#60a5fa", "#16a34a", "#ef4444"], 
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.6,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, 
            },
            tooltip: {
                enabled: true,
                backgroundColor: "#B32346",
                titleColor: "#fff",
                bodyColor: "#fff",
                padding: 10,
            },
        },
        animation: {
            duration: 1500,
            easing: "easeOutBounce", 
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    color: "#1f2937",
                    font: {
                        weight: "bold",
                    },
                },
                grid: {
                    color: "#e5e7eb", 
                },
            },
            x: {
                ticks: {
                    color: "#1f2937",
                    font: {
                        weight: "bold",
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="w-full mx-auto p-4 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-[#B32346] text-center">
                Donar Overview
            </h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default AdminanalysisChart;