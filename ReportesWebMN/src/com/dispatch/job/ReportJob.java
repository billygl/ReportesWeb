package com.dispatch.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.dispatch.bean.ReporteBean;
import com.dispatch.service.ReporteService;

@Component("ReportJob")
public class ReportJob {
	@Autowired
	private SimpMessagingTemplate webSocket;
	
	private ReporteService reporteService = null;
	
	public static final String CHANNEL_REPORTE1 = "/reporte/reporte1";
	public static final String CHANNEL_REPORTE2 = "/reporte/reporte2";
	
	@Autowired
	public void setReporteService(ReporteService reporteService) {
		this.reporteService = reporteService;
	}
	
	public void printMessage() {
		ReporteBean reporte = new ReporteBean(1, "reporte1", "");
		webSocket.convertAndSend(CHANNEL_REPORTE1, reporte);
		System.out.println("Sending report...");
	}
	
	public void sendCargas() {
		webSocket.convertAndSend(CHANNEL_REPORTE2, reporteService.getDescargasActual());
	}
}
