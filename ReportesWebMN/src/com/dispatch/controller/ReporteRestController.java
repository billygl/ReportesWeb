package com.dispatch.controller;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dispatch.bean.DescargasBean;
import com.dispatch.bean.ReporteBean;
import com.dispatch.service.ReporteService;

@RestController
@RequestMapping(value = "/api")
public class ReporteRestController {
 
	private ReporteService reporteService = null;
	
	Logger LOG = Logger.getLogger(ReporteRestController.class.getName());

	@Autowired
	public void setReporteService(ReporteService reporteService) {
		this.reporteService = reporteService;
	}
	
    @RequestMapping("/reporte/{reporte}")
    public ReporteBean getReporte(@PathVariable String reporte) {//REST Endpoint. 
        ReporteBean reporteBean = new ReporteBean(0, reporte, "-");
        return reporteBean;
    }
    ///grafico/graficoid int
    @RequestMapping("/grafico/{id}")
    public ReporteBean getGrafico(@PathVariable int id) {//REST Endpoint.
        ReporteBean reporteBean = new ReporteBean(id, "-", "-");
        return reporteBean;
    }
    
    //TODO investigate optionals
    @RequestMapping("/descargas")
    public List<DescargasBean> getDescargas(
    		@RequestParam("fromDate") @DateTimeFormat(pattern="ddMMyyyy") Date fromDate,
    		@RequestParam("toDate") @DateTimeFormat(pattern="ddMMyyyy") Date toDate,
    		@RequestParam("shifts") List<String> shifts
    		) {
        return reporteService.getDescargas(fromDate, toDate, shifts);
    }
    @RequestMapping("/descargas_actual")
    public List<DescargasBean> getDescargasActual() {
    	return reporteService.getDescargasActual();
    }
    
    @RequestMapping("/reporte")
    public ReporteBean getReporte() {
    	return reporteService.getReporte();
    }
}