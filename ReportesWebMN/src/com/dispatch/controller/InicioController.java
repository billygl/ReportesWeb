package com.dispatch.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class InicioController { 
	
   @RequestMapping(method = RequestMethod.GET)
   public String inicio(ModelMap model) {
	  model.addAttribute("titulo", "Reportes!");
      return "reports/index";
   }
   @RequestMapping(value="ayuda", method = RequestMethod.GET)
   public String ayuda(ModelMap model) {
	  model.addAttribute("titulo", "Ayuda!");
      return "ayuda";
   }
}