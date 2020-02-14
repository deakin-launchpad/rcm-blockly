function createCircle(cx, cy, r, fill) {
  //Draw the Circle
  return svgContainer.append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", r)
    .style("fill", fill);
}

function clearCanvas() {
  d3.selectAll("#svg-container > svg > *").remove();
}
