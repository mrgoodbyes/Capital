package objects.ship;

import java.io.Serializable;
import java.util.ArrayList;

public class Ship implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3108374892281771357L;

	/**
	 * Attributes
	 */
	
	private int crew;
	
	private int maxCrew;
	
	private int moral;
	
	private int hull;
	
	private int morale;
	
	private int frontShield;
	
	private int aftShield;
	
	private int portShield;
	
	private int starboardShield;
	
	private int speed;
	
	
	private ArrayList<Compartment> compartments;
	
	
}
