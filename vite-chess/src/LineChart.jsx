import { useEffect, useRef } from "react";
import * as d3 from "d3";

function LineChart({ pieceName, movesWhite, movesBlack, positions }) {
  const chartRef = useRef();

  useEffect(() => {
    const margin = { top: 10, right: -10, bottom: 10, left: 10 };
    const width = (window.innerWidth * 0.9) / 8 - margin.left - margin.right;
    const height = window.innerHeight * 0.4 - margin.top - margin.bottom;
    const chart = d3.select(chartRef.current);
    chart.selectAll("*").remove();
    chart
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const xScale = d3
      .scaleLinear()
      .domain([0, movesWhite.length + 1])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([1, 64])
      .range([height - margin.bottom, 0]);

    const g = chart
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const lineWhite = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(positions.indexOf(d) + 1));
    const lineBlack = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(positions.indexOf(d) + 1));

    g.append("path")
      .datum(movesWhite)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("d", lineWhite)
      .attr("transform", `translate(${margin.left},0)`);
    g.append("path")
      .datum(movesBlack)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("d", lineBlack)
      .attr("transform", `translate(${margin.left},0)`);

    var xAxis = d3.axisBottom(xScale).ticks(movesWhite.length + 1);
    var yAxis = d3
      .axisLeft(yScale)
      .ticks(64)
      .tickSize(2)
      .tickFormat((d, i) => positions[i]);
    g.append("g")
      .style("font-size", "14px")
      .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
      .call(xAxis);
    g.append("g")
      .style("font-size", "6px")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);
  }, [movesWhite, movesBlack, positions]);

  return (
    <div className="bg-pink-200 w-full border-black border-2 h-full">
      <p>{pieceName}</p>
      <svg ref={chartRef}></svg>
    </div>
  );
}

export default LineChart;
