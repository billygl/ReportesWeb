package com.dispatch.job;

import org.springframework.stereotype.Component;

@Component("ReportJob")
public class ReportJob {
	public void printMessage() {
		System.out.println("Sending report...");
	}
}
