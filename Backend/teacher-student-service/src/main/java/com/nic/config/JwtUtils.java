package com.nic.config;

import java.security.Key;
import java.util.Base64.Decoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.nic.service.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtils {

	@Value("${spring.app.jwtSecret}")
	private String jwtSecret;
	
	@Value("${spring.app.jwtExpirationMs}")
	private int jwtExpirationMs; 
	
	@Autowired
	private UserService userService;
	
	
	
	public String getJwtFromHeader(HttpServletRequest request)
	{
		String bearerToken = request.getHeader("Authorization");
		
		if(bearerToken != null && bearerToken.startsWith("Bearer "))
		{
			return bearerToken.substring(7);
		}
		return null;
	}
	
	
	public String generateTokenFromUsername(UserDetails userDetails)
	{
		
		String username = userDetails.getUsername();
		
		User user = userService.getUserDetailsByEmail(username);
		
		
		
		Map<String,Object> claims = new HashMap<>();
		claims.put("name", user.getName() );
		claims.put("role",user.getRole() );
		claims.put("userid",user.getUserId() );
		
		return Jwts.builder()
				   .claims(claims)
				   .subject(username)
				   .issuedAt(new Date())
				   .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
				   .signWith(key())
				   .compact();
		
	}
	
	private Key key()
	{
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
	}
	
	public String getUsernameFromJwtToken(String token)
	{
		return Jwts.parser().verifyWith((SecretKey) key())
				   .build()
				   .parseSignedClaims(token)
				   .getPayload()
				   .getSubject();
		
	}
	
	public Claims getPayloadFromJwt(String token)
	{
//		token = token.substring(7);
		return Jwts.parser().verifyWith((SecretKey) key())
				   .build().
				   parseClaimsJws(token).
				   getBody();
	}
	
	public boolean validateJwtToken(String token)
	{
		try {
				
				Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(token);
				return true;
		}
		catch(MalformedJwtException e)
		{
			System.out.println("Invalid JWT Token : "+e.getMessage());
			throw e;
		}
		catch(ExpiredJwtException e)
		{
			System.out.println("JWT  Token expired : "+e.getMessage());
			throw e;
		}
		catch(UnsupportedJwtException e)
		{
			System.out.println("JWT Token is Unsupported : "+e.getMessage());
			throw e;
		}
		catch(IllegalArgumentException e)
		{
			System.out.println("JWT Claims string is empty : "+e.getMessage());
			throw e;
		}
		catch(Exception e)
		{
			System.out.println("Unknown Exception occurred");
		}
		return false;
	}
}
