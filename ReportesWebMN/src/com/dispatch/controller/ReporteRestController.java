package com.dispatch.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dispatch.bean.ReporteBean;

@RestController
@RequestMapping(value = "/api")
public class ReporteRestController {
 
    @RequestMapping("/reporte/{reporte}")
    public ReporteBean message(@PathVariable String reporte) {//REST Endpoint. 
        ReporteBean reporteBean = new ReporteBean(reporte, "-");
        return reporteBean;
    }
}