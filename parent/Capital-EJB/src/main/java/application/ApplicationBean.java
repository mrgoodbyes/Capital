package application;

import java.util.HashMap;

import javax.annotation.PostConstruct;
import javax.enterprise.context.SessionScoped;
import javax.inject.Named;

/**
 *
 * @author Mrgoodbyes
 */

@SessionScoped
@Named("app")
public class ApplicationBean {

	private HashMap<String,String> config;
	
	
	@PostConstruct
	public void newSession(){
		config = new HashMap<String,String>();
		
	}
	
	
    public void businessMethod() {
    }
    
    public String jsAsset(String name){

    	return name;
    }
}
