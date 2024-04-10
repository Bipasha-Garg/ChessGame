import { useEffect, useRef } from "react";
import * as d3 from "d3";

function LineChart({
  pieceName,
  movesWhite,
  movesBlack,
  positions,
  noOfMoves,
}) {
  // reference for the chart
  const chartRef = useRef();

  useEffect(() => {
    // declare dimensions for the chart
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = (window.innerWidth * 0.9) / 8 - margin.left - margin.right;
    const height = window.innerHeight * 0.4 - margin.top - margin.bottom;

    // creating the chart
    const chart = d3.select(chartRef.current);
    chart.selectAll("*").remove();
    chart
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    // setting up the scaling for x and y axes
    const xScale = d3
      .scaleLinear()
      .domain([0, noOfMoves])
      .range([0, width - margin.left]);
    const yScale = d3
      .scaleLinear()
      .domain([1, 64])
      .range([height - margin.bottom, 0]);

    // creating group of svg for chart
    const g = chart
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // line generator for moves of white piece and black piece
    const lineWhite = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(positions.indexOf(d) + 1));
    const lineBlack = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(positions.indexOf(d) + 1));

    // render the line and dots for white piece
    g.append("path")
      .datum(movesWhite)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("d", lineWhite)
      .attr("transform", `translate(${margin.left},0)`);
    g.selectAll("dots")
      .data(movesWhite)
      .enter()
      .append("circle")
      .attr("cx", function (d, i) {
        return xScale(i) + margin.left;
      })
      .attr("cy", function (d) {
        return yScale(positions.indexOf(d) + 1);
      })
      .attr("r", 2)
      .attr("fill", "white");

    // render the line and dots for black piece
    g.append("path")
      .datum(movesBlack)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("d", lineBlack)
      .attr("transform", `translate(${margin.left},0)`);
    g.selectAll("dots")
      .data(movesBlack)
      .enter()
      .append("circle")
      .attr("cx", function (d, i) {
        return xScale(i) + margin.left;
      })
      .attr("cy", function (d) {
        return yScale(positions.indexOf(d) + 1);
      })
      .attr("r", 2)
      .attr("fill", "black");

    // render the axes
    var xAxis = d3.axisBottom(xScale).ticks(noOfMoves + 1);
    var yAxis = d3
      .axisLeft(yScale)
      .ticks(64)
      .tickSize(2)
      .tickFormat((d, i) => positions[i]);
    g.append("g")
      .style("font-size", "8px")
      .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
      .call(xAxis)
      // tilt the labels
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-1em")
      .attr("dy", "-0.8em")
      .attr("transform", "rotate(270)");
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
