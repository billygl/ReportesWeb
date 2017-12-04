package com.dispatch.bean;

import java.util.Date;

public class DescargasBean {
	Date fecha;
	String turno;
	String CompDestino;
	double tonelaje;
	String categoria;
	
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public String getTurno() {
		return turno;
	}
	public void setTurno(String turno) {
		this.turno = turno;
	}
	public String getCompDestino() {
		return CompDestino;
	}
	public void setCompDestino(String compDestino) {
		CompDestino = compDestino;
	}
	public double getTonelaje() {
		return tonelaje;
	}
	public void setTonelaje(double tonelaje) {
		this.tonelaje = tonelaje;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	
}
