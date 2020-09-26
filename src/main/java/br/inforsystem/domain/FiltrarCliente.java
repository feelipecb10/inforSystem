package br.inforsystem.domain;

public class FiltrarCliente {
	private String campoConsulta;
	private String valorConsulta;
	private Long limitConsulta;
	
	public String getCampoConsulta() {
		return campoConsulta;
	}
	public void setCampoConsulta(String campoConsulta) {
		this.campoConsulta = campoConsulta;
	}
	public String getValorConsulta() {
		return valorConsulta;
	}
	public void setValorConsulta(String valorConsulta) {
		this.valorConsulta = valorConsulta;
	}
	public Long getLimitConsulta() {
		return limitConsulta;
	}
	public void setLimitConsulta(Long limitConsulta) {
		this.limitConsulta = limitConsulta;
	}
}
