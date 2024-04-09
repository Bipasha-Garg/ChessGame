import { useEffect, useRef } from "react";
import * as d3 from "d3";

function LineChart({ pieceName, movesWhite, movesBlack }) {
  const chartRef = useRef();

  var letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  var numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
  var positions = [];
  for (var i = 0; i < 8; ++i)
    for (var j = 0; j < 8; ++j) positions.push(letters[i] + numbers[j]);

  console.log(positions);
    useEffect(() => {
    const margin = { top: 10, right: 0, bottom: 10, left: 5 };
    const width = (window.innerWidth * 0.8) / 8 - margin.left - margin.right;
    const height = window.innerHeight * 0.4 - margin.top - margin.bottom;
    const chart = d3.select(chartRef.current);
    chart.selectAll("*").remove();
    chart
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const xScale = d3
      .scaleLinear()
      .domain([0, movesWhite.length])
      .range([0, width]);
    const yScale = d3.scaleLinear().domain(positions).range([height, 0]);

    const g = chart
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const lineWhite = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d));
    const lineBlack = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d));

    g.append("path")
      .datum(movesWhite)
      .attr("stroke", "white")
      .attr("stroke-width", 3)
      .attr("d", lineWhite);
    g.append("path")
      .datum(movesBlack)
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .attr("d", lineBlack);
    g.append("g")
      .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));
    g.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
  }, [movesWhite, movesBlack]);

  return (
    <div className="bg-pink-200 w-full border-black border-2 h-full">
      <h1>{pieceName}</h1>
      <svg ref={chartRef} className=""></svg>
    </div>
  );
}

export default LineChart;
