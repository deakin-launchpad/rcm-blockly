function createCircle(cx, cy, r, fill, text) {
  svgContainer
    .append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", r)
    .style("fill", fill)

  svgContainer
    .append("text")
    .attr("x", cx - r)
    .attr("y", cy + r + 15)
    .attr("font-family", "sans-serif")
    // .attr("font-size", "20px")
    // .attr("fill", "red")
    .text(text || "null");
}

function drawLine(x1, y1, x2, y2) {
  svgContainer.append("line")
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2)
    .attr("stroke-width", 2)
    .attr("stroke", "black");
}

function clearCanvas() {
  d3.selectAll("#svg-container > svg > *").remove();
}
