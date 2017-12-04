package com.dispatch.bean;

import java.util.List;

public class ReporteBean {
	int id;
	String titulo;	
	String descripcion;
	List<DescargasBean> descargas;
	
	public ReporteBean() {
				
	}
	public ReporteBean(int id, String titulo, String descripcion) {
		this.id = id;
		this.titulo = titulo;
		this.descripcion = descripcion;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public List<DescargasBean> getDescargas() {
		return descargas;
	}
	public void setDescargas(List<DescargasBean> descargas) {
		this.descargas = descargas;
	}
}
