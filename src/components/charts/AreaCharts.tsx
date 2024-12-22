import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface AreaChartProps {
  data: { x: string; y1: number; y2: number }[];
  height?: number;
}

const AreaChart: React.FC<AreaChartProps> = ({ data, height = 300 }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Check if all y1 and y2 values are 0
    const allZero = data.every((d) => d.y1 === 0 && d.y2 === 0);
    if (allZero) {
      d3.select(svgRef.current).selectAll("*").remove(); // Clear the SVG
      d3.select(svgRef.current)
        .append("text")
        .attr("x", "50%")
        .attr("y", "50%")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "16px")
        .attr("fill", "#888")
        .text("No data available");
      return;
    }

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const containerWidth = svgRef.current.parentElement?.clientWidth || 800;
    const svgWidth = containerWidth - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("height", height)
      .attr("viewBox", `0 0 ${containerWidth} ${height}`)
      .attr("preserveAspectRatio", "xMinYMin meet");

    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("width", "100%")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const x = d3.scalePoint().domain(months).range([0, svgWidth]).padding(0.5);
    const yMax = d3.max(data, (d) => Math.max(d.y1, d.y2)) || 500;
    const y = d3.scaleLinear().domain([0, yMax]).range([svgHeight, 0]);

    const area1 = d3
      .area<{ x: string; y1: number; y2: number }>()
      .x((d) => x(d.x) || 0)
      .y0(svgHeight)
      .y1((d) => y(d.y1))
      .curve(d3.curveBasis);

    const area2 = d3
      .area<{ x: string; y1: number; y2: number }>()
      .x((d) => x(d.x) || 0)
      .y0(svgHeight)
      .y1((d) => y(d.y2))
      .curve(d3.curveBasis);

    const gradient1 = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient1")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "0%");

    gradient1
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "rgba(127, 85, 218, 0.1)");

    gradient1
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgba(68, 45, 116, 0.05)");

    const gradient2 = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient2")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "0%");

    gradient2
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "rgba(46, 144, 250, 0.1)");

    gradient2
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgba(27, 85, 148, 0.05)");

    // Area1 fill with gradient1
    g.append("path")
      .datum(data)
      .attr("fill", "url(#gradient1)")
      .attr("d", area1);

    g.append("path")
      .datum(data)
      .attr("fill", "url(#gradient2)")
      .attr("opacity", 0.7)
      .attr("d", area2);

    g.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("stroke", "#5e4cb8")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr(
        "d",
        d3
          .line<{ x: string; y1: number; y2: number }>()
          .x((d) => x(d.x) || 0)
          .y((d) => y(d.y1))
          .curve(d3.curveBasis)
      );

    g.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("stroke", "#1da4d7")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr(
        "d",
        d3
          .line<{ x: string; y1: number; y2: number }>()
          .x((d) => x(d.x) || 0)
          .y((d) => y(d.y2))
          .curve(d3.curveBasis)
      );

    // Add axes
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${svgHeight})`)
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "y-axis")
      .call(
        d3
          .axisLeft(y)
          .ticks(6)
          .tickFormat((d) => {
            const value = Number(d);
            if (value >= 1_000_000) return `${value / 1_000_000}m`;
            if (value >= 1_000) return `${value / 1_000}k`;
            if (value >= 100) return `${value}`;
            return value.toString();
          })
      );
  }, [data, height]);

  return <svg ref={svgRef} style={{ width: "100%" }}></svg>;
};

export default AreaChart;
