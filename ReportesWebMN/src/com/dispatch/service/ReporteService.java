package com.dispatch.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dispatch.bean.DescargasBean;
import com.dispatch.dao.DescargasDAO;

@Service
public class ReporteService {
	
	private DescargasDAO descargasDAO;
	
	@Autowired
	public void setClusterDAO(DescargasDAO descargasDAO) {
		this.descargasDAO = descargasDAO;
	}	
	
	public List<DescargasBean> getAllDescargas() {
		List<DescargasBean> list = new ArrayList<DescargasBean>();
		try {
			list = descargasDAO.getDescargas();
		} catch (Exception e) {
			//TODO Log
		}
		return list;
	}	
	
}
