package com.dispatch.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.dispatch.bean.ReporteBean;

@Controller
public class ReporteSocketController {
	
    @MessageMapping("/getreporte")
    @SendTo("/reporte/reporte1")
    public ReporteBean greeting(ReporteBean reporte) throws Exception {
        return reporte;
    }
}
