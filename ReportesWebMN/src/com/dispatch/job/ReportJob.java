package com.dispatch.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component("ReportJob")
public class ReportJob {
	@Autowired
	private SimpMessagingTemplate webSocket;
	
	public static final String CHANNEL_REPORTE1 = "/reporte/reporte1";
	
	public void printMessage() {
		//webSocket.convertAndSend(CHANNEL_REPORTE1, new String(message.getBody()));
		System.out.println("Sending report...");
	}
}
