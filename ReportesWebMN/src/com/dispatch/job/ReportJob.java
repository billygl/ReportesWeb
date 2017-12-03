package com.dispatch.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.dispatch.bean.ReporteBean;

@Component("ReportJob")
public class ReportJob {
	@Autowired
	private SimpMessagingTemplate webSocket;
	
	public static final String CHANNEL_REPORTE1 = "/reporte/reporte1";
	
	public void printMessage() {
		ReporteBean reporte = new ReporteBean(1, "reporte1", "");
		webSocket.convertAndSend(CHANNEL_REPORTE1, reporte);
		System.out.println("Sending report...");
	}
}
