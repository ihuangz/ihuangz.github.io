---
layout: page
permalink: /members/
title: Members
description: Seite 2011 ...
nav: true
nav_order: 4
horizontal: true
display_categories: [博士后, 博士生, 硕士生, 本科生, 毕业生]
---

Thanks very much.

<!-- pages/members.md -->

<div class="projects">
{%- if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_projects = site.members | where: "category", category -%}
  {%- assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-1">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {% endfor %}


{%- else -%}
<!-- Display projects without categories -->
  {%- assign sorted_projects = site.members | sort: "importance" -%}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}

  <div class="container">
    <div class="row row-cols-1">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>


  {%- else -%}

  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
{%- endif -%}

<div id="map" style="height: 400px; width: 770px"></div>


<script>
    var basemapLayer0 = L.tileLayer('http://t1.tianditu.com/vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=8899fd3e86aa994f71465b1c56a98727',
      {
        maxZoom: 18,
        minZoom: 1,
        tileSize: 256,
        zoomOffset: 1
      });
    var basemapLayer1 = L.tileLayer('http://t1.tianditu.com/cva_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=8899fd3e86aa994f71465b1c56a98727',
      {
        maxZoom: 18,
        minZoom: 1,
        tileSize: 256,
        zoomOffset: 1
      });
    var basemap = L.layerGroup([basemapLayer0, basemapLayer1]);
    let map = L.map('map', {
      preferCanvas: true,
      crs: L.CRS.EPSG4326,
      layers: [basemap],
      zoomControl: false,
      attributionControl: false,
      doubleClickZoom: false,
      editable: true//绘制控件
    }).setView([32.0617,118.7778], 13);
    var locations = [
  	["HUANG ZC", 32.0617,118.7778],
  	["ZHANG C", 41.881832, -87.623177],
  	["BI YJ", 29.72567,106.70792]
	];
	for (var i = 0; i < locations.length; i++) {
  	marker = new L.marker([locations[i][1], locations[i][2]]).bindPopup(locations[i][0]).addTo(map);
	}
</script>






</div>
