package com.dispatch.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dispatch.bean.DescargasBean;
import com.dispatch.bean.ReporteBean;
import com.dispatch.dao.DescargasDAO;

@Service
public class ReporteService {
	
	private DescargasDAO descargasDAO;
	
	@Autowired
	public void setDescargasDAO(DescargasDAO descargasDAO) {
		this.descargasDAO = descargasDAO;
	}	
	
	public List<DescargasBean> getDescargas(Date fromDate, Date toDate, List<String> shifts) {
		List<DescargasBean> list = new ArrayList<DescargasBean>();
		try {
			SimpleDateFormat dt1 = new SimpleDateFormat("dd/MM/yyyy");
			list = descargasDAO.getDescargas(dt1.format(fromDate), dt1.format(toDate), shifts);
		} catch (Exception e) {
			//TODO Log
		}
		return list;
	}	
	public List<DescargasBean> getDescargasActual() {
		List<DescargasBean> list = new ArrayList<DescargasBean>();
		try {
			list = descargasDAO.getDescargasActual();
		} catch (Exception e) {
			//TODO Log
			e.printStackTrace();
		}
		return list;
	}	
	public ReporteBean getReporte() {
		List<DescargasBean> list = new ArrayList<DescargasBean>();
		try {
			//list = descargasDAO.getDescargas();
		} catch (Exception e) {
			//TODO Log
		}
		ReporteBean reporte = new ReporteBean();
		reporte.setDescargas(list);
		return reporte;
	}	
	
}
