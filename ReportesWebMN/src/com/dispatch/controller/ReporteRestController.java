package com.dispatch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dispatch.bean.DescargasBean;
import com.dispatch.bean.ReporteBean;
import com.dispatch.service.ReporteService;

@RestController
@RequestMapping(value = "/api")
public class ReporteRestController {
 
	private ReporteService reporteService = null;

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
    
    @RequestMapping("/descargas")
    public List<DescargasBean> getDescargas() {
        return reporteService.getAllDescargas();
    }
}