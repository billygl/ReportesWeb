package com.dispatch.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dispatch.bean.ReporteBean;

@RestController
@RequestMapping(value = "/api")
public class ReporteRestController {
 
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
}