package com.dispatch.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.dispatch.bean.ReporteBean;

@Controller
public class ReporteSocketController {
	
    @MessageMapping("/getreporte")//prefix con application-destination-prefix
    @SendTo("/reporte/reporte1")//simple-broker prefix
    public ReporteBean testReporte(ReporteBean reporte) throws Exception {
    	reporte.setDescripcion("---");
    	System.out.println("testReporte");
        return reporte;
    }
}
