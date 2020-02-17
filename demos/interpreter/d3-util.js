function createCircle(id, cx, cy, r, fill, text, onClick) {
  id = "viz_" + id
  let group = svgContainer
    .append("g")
    .attr("id", id)
    .attr("onclick", onClick)

  group.append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", r)
    .style("fill", fill)

  group.append("text")
    .attr("x", cx - r)
    .attr("y", cy + r + 15)
    .attr("font-family", "sans-serif")
    // .attr("font-size", "20px")
    // .attr("fill", "red")
    .text(text || "null");

  return id;
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
