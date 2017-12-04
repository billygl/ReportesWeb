package com.dispatch.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.dispatch.bean.DescargasBean;

public interface DescargasDAO { 
	public List<DescargasBean> getDescargas(
			@Param("fromDate") String fromDate, 
			@Param("toDate") String toDate, 
			@Param("shifts") List<String> shifts);
}
