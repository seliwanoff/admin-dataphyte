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

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const containerWidth = svgRef.current.parentElement?.clientWidth || 800;
    const svgWidth = containerWidth - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("height", height)
      .attr("viewBox", `0 0 ${containerWidth} ${height}`)
      .attr("preserveAspectRatio", "xMinYMin meet");

    // Clear previous contents of the SVG
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
    const y = d3.scaleLinear().domain([0, 200000]).range([svgHeight, 0]);

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

    // Gradient for the first area
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

    // Updated gradient for the second area with your specified colors
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

    // Area2 fill with gradient2
    g.append("path")
      .datum(data)
      .attr("fill", "url(#gradient2)")
      .attr("opacity", 0.7)
      .attr("d", area2);

    // Adding lines for both areas
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
      .attr("width", "100%")
      .attr("transform", `translate(0,${svgHeight})`)
      .attr(
        "class",
        "font-polySans text-[12px] uppercase font-normal text-left text-[#4f4f4f]"
      )
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "y-axis")
      .call(
        d3
          .axisLeft(y)
          .ticks(6)
          .tickFormat((d) => `${Number(d) / 1000}k`)
      );
  }, [data, height]);

  return <svg ref={svgRef} style={{ width: "100%" }}></svg>;
};

export default AreaChart;
