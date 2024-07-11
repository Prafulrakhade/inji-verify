package utils;

import io.cucumber.java.After;
import io.cucumber.java.Before;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.yaml.snakeyaml.Yaml;

public class BaseTest {

	protected static final String ENVIRONMENT = System.getProperty("env") == null ? "qa-inji"
			: System.getProperty("env");

	public void setDriver(WebDriver driver) {
		this.driver = driver;
	}

	public WebDriver driver;
	public JavascriptExecutor jse;
	String accessKey = getKeyValueFromYaml("/browserstack.yml","accessKey");
	String userName = getKeyValueFromYaml("/browserstack.yml","userName");
	public  final String URL = "https://" + userName + ":" + accessKey + "@hub-cloud.browserstack.com/wd/hub";

	@Before
	public void beforeAll() throws MalformedURLException {
		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability("browserName", "Chrome");
		capabilities.setCapability("browserVersion", "latest");
		HashMap<String, Object> browserstackOptions = new HashMap<String, Object>();
		browserstackOptions.put("os", "Windows");
		browserstackOptions.put("osVersion", "10");
		browserstackOptions.put("projectName", "Bstack-[Java] Sample file download");
		capabilities.setCapability("bstack:options", browserstackOptions);

		driver = new RemoteWebDriver(new URL(URL), capabilities);
		jse = (JavascriptExecutor) driver;
		driver.manage().window().maximize();
		driver.get("https://injiverify.qa-inji.mosip.net/");
	}

	@After
	public void afterAll() {
		if (driver != null) {
			driver.quit();
		}
	}
	public WebDriver getDriver() {
		return driver;
	}

	public static String getKeyValueFromYaml(String filePath, String key) {
		FileReader reader = null;
		try {
			reader = new FileReader(System.getProperty("user.dir")+filePath);
		} catch (FileNotFoundException e) {
			throw new RuntimeException(e);
		}
		Yaml yaml = new Yaml();
		Object data = yaml.load(reader);

		if (data instanceof Map) {
			@SuppressWarnings("unchecked")
			Map<String, String> map = (Map<String, String>) data;
			return (String) map.get(key);
		}  else {
			throw new RuntimeException("Invalid YAML format, expected a map");
		}
	}
}